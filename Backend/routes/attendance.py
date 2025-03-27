import face_recognition
import numpy as np
import pymongo
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from PIL import Image
import io
import traceback
from pymongo import MongoClient

# ✅ Connect to MongoDB
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["face_recognition_db"]  # Change this to match your actual database name
    collection = db["CourseTrainingData"]  # Change this to match your collection name
except Exception as db_error:
    print("MongoDB Connection Error:", str(db_error))

attendance_bp = Blueprint("attendance", __name__)

@attendance_bp.route('/uploads', methods=['POST'])
@cross_origin()
def recognize_face():
    # Retrieve teacherId and courseName from the request
    teacher_id = request.form.get("teacherId")
    course_name = request.form.get("subject")  # Key sent from frontend

    if not teacher_id or not course_name:
        return jsonify({"error": "Missing teacherId or courseName"}), 400

    # Retrieve the image file from request
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No image provided"}), 400

    # Convert image to a format suitable for face recognition
    image = face_recognition.load_image_file(io.BytesIO(file.read()))
    face_encodings = face_recognition.face_encodings(image)

    if not face_encodings:
        return jsonify({"error": "No face detected in image"}), 400

    input_encoding = face_encodings[0]  # Take the first detected face

    # Fetch stored encodings from MongoDB for the given teacher and course
    record = collection.find_one({"teacherId": teacher_id, "courseName": course_name})
    
    if not record:
        return jsonify({"error": "No stored data found for given teacherId and courseName"}), 404

    # Iterate through stored student data to find a match
    for student in record["trainedData"]:
        stored_encoding = np.array(student["encoding"])  # Convert to NumPy array
        match = face_recognition.compare_faces([stored_encoding], input_encoding, tolerance=0.5)

        if match[0]:  # If match is found
            return jsonify({"regNo": student["regNo"]})  # Return student registration number

    return jsonify({"message": "No match found"}), 200