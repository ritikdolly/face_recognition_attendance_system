from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
from uuid import uuid4

from models.user import create_user, find_user
from models.class_model import extract_images
from models.train_model import train_face_recognition, get_courses_by_teacher

UPLOAD_FOLDER = "uploads"
SECRET_KEY = "your_secret_key" 

auth_bp = Blueprint("auth", __name__)

# ---- REGISTER USER ----
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    required_fields = ["username", "password", "confirmPassword", "email", "phone"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"status": False, "message": "Missing fields"}), 400

    if data["password"] != data["confirmPassword"]:
        return jsonify({"status": False, "message": "Passwords do not match"}), 400

    del data["confirmPassword"]
    data["password"] = generate_password_hash(data["password"])
    data["teacherId"] = str(uuid4())

    response = create_user(data)
    return jsonify(response)

# ---- LOGIN USER ----
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = find_user(data.get("username"))

    if not user or not check_password_hash(user["password"], data.get("password")):
        return jsonify({"status": False, "message": "Invalid credentials"}), 401

    token = jwt.encode(
        {"username": user["username"], "teacherId": user["teacherId"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
        SECRET_KEY, algorithm="HS256"
    )

    return jsonify({"status": True, "message": "Login successful", "token": token, "teacherId": user["teacherId"]})

# ---- CREATE COURSE ----
@auth_bp.route('/create_course', methods=['OPTIONS', 'POST'])
def upload_data():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight successful"}), 200  # Handle CORS preflight

    course_name = request.form.get('courseName')
    num_students = request.form.get('numStudents')
    teacher_id = request.form.get('teacherId')

    if not teacher_id:
        return jsonify({"error": "Teacher ID is required"}), 400

    if 'zipFile' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    zip_file = request.files['zipFile']
    zip_path = os.path.join(UPLOAD_FOLDER, zip_file.filename)
    zip_file.save(zip_path)

    image_folder = extract_images(zip_path)
    train_face_recognition(image_folder, course_name, num_students, teacher_id)

    return jsonify({"message": "Training complete and data stored!"})

# ---- GET COURSES ----
@auth_bp.route('/get_courses', methods=['GET'])
def fetch_courses():
    teacher_id = request.args.get('teacherId')

    if not teacher_id:
        return jsonify({"status": False, "message": "Teacher ID is required"}), 400

    courses = get_courses_by_teacher(teacher_id)
    return jsonify({"courses": courses}), 200
