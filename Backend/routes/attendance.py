import face_recognition
import numpy as np
import pymongo
from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from PIL import Image
import io
import traceback
from pymongo import MongoClient
from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel
from typing import List
from datetime import datetime
from bson import ObjectId

app = FastAPI()

# ✅ Connect to MongoDB
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["face_recognition_db"]  # Change this to match your actual database name
    courses_collection  = db["CourseTrainingData"]  # Change this to match your collection name
    attendance_collection = db["attendance"]
except Exception as db_error:
    print("MongoDB Connection Error:", str(db_error))

attendance_bp = Blueprint("attendance", __name__)

@attendance_bp.route('/recognize', methods=['POST'])
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
    record = courses_collection .find_one({"teacherId": teacher_id, "courseName": course_name})
    
    if not record:
        return jsonify({"error": "No stored data found for given teacherId and courseName"}), 404

    # Iterate through stored student data to find a match
    for student in record["trainedData"]:
        stored_encoding = np.array(student["encoding"])  # Convert to NumPy array
        match = face_recognition.compare_faces([stored_encoding], input_encoding, tolerance=0.5)

        if match[0]:  # If match is found
            return jsonify({"regNo": student["regNo"]})  # Return student registration number

    return jsonify({"message": "No match found"}), 200



@attendance_bp.route("/mark_attendance", methods=['POST'])
@cross_origin()
def mark_attendance():
    try:
        data = request.get_json()
        teacher_id = data.get("teacherId")
        course_name = data.get("courseName")
        present_students = data.get("present_students", [])

        if not teacher_id or not course_name or not isinstance(present_students, list):
            return jsonify({"error": "Invalid request data"}), 400

        # ✅ Get current date and timestamp
        current_date = datetime.now().strftime("%Y-%m-%d")
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # ✅ Find course record in CourseTrainingData
        trained_data = courses_collection.find_one({"teacherId": teacher_id, "courseName": course_name})
        if not trained_data:
            return jsonify({"error": "Course not found!"}), 404

        all_students = [student["regNo"] for student in trained_data.get("trainedData", [])]
        absent_students = [regNo for regNo in all_students if regNo not in present_students]

        # ✅ Update or insert attendance record in `attendance` collection
        attendance_collection.update_one(
            {"teacherId": teacher_id, "courseName": course_name, "date": current_date},
            {"$setOnInsert": {"students": {}, "date": current_date}},
            upsert=True
        )
        
        # ✅ Update present and absent counts
        for regNo in all_students:
            if regNo in present_students:
                attendance_collection.update_one(
                    {"teacherId": teacher_id, "courseName": course_name, "date": current_date},
                    {"$inc": {f"students.{regNo}.present": 1}}
                )
            else:
                attendance_collection.update_one(
                    {"teacherId": teacher_id, "courseName": course_name, "date": current_date},
                    {"$inc": {f"students.{regNo}.absent": 1}}
                )
        
        # ✅ Update CourseTrainingData with timestamped attendance
        courses_collection.update_one(
            {"teacherId": teacher_id, "courseName": course_name},
            {"$push": {"attendance": {timestamp: {"present": present_students, "absent": absent_students}}}}
        )

        return jsonify({"message": "Attendance recorded successfully!", "date": current_date, "timestamp": timestamp})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "An error occurred while marking attendance"}), 500



# ✅ Define a Pydantic model for the attendance record
@attendance_bp.route("/sessions", methods=["GET"])
def get_sessions():
    teacher_id = request.args.get("teacherId")
    if not teacher_id:
        return jsonify({"error": "Missing teacherId"}), 400

    try:
        sessions = list(courses_collection .find({"teacherId": teacher_id}, {"_id": 0}))
        return jsonify(sessions), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@attendance_bp.route('/check_attendance/', methods=['POST'])
def get_attendance_sessions():
    teacher_id = request.args.get("teacherId")
    course_name = request.args.get("courseName")  # Get courseName from URL

    if not teacher_id or not course_name:
        return jsonify({"error": "teacherId and courseName are required"}), 400

    sessions = courses_collection.find({
        "teacherId": teacher_id,
        "courseName": course_name  # Ensure only the selected course is retrieved
    })

    result = []
    for session in sessions:
        attendance_records = session.get("attendance", [])

        for record in attendance_records:
            for timestamp, details in record.items():
                present_count = len(details.get("present", []))
                absent_count = len(details.get("absent", []))

                result.append({
                    "date": timestamp.split(), 
                    # "date": timestamp.split()[0],
                    # "time": timestamp.split()[1],
                    "present": present_count,
                    "absent": absent_count,
                    "totalStudents": present_count + absent_count
                })

    return jsonify(result)



@attendance_bp.route("/List_Of_Present_Absent", methods=["GET"])
def get_attendance_details():
    teacher_id = request.args.get("teacherId")
    course_name = request.args.get("courseName")
    date = request.args.get("date")
    time = request.args.get("time")

    if not teacher_id or not course_name or not date or not time:
        return jsonify({"status": False, "message": "Missing required parameters"}), 400

    # Convert date and time format to match MongoDB storage
    try:
        formatted_date = datetime.strptime(date, "%m/%d/%Y").strftime("%Y-%m-%d")
        formatted_time = datetime.strptime(time, "%I:%M:%S %p").strftime("%H:%M:%S")
        date_time = f"{formatted_date} {formatted_time}"
    except ValueError:
        return jsonify({"status": False, "message": "Invalid date/time format"}), 400

    # Debugging logs
    # print(f"Received Params - Teacher ID: {teacher_id}, Course Name: {course_name}, Date-Time: {date_time}")

    # Find the course document
    course = courses_collection.find_one({"teacherId": teacher_id, "courseName": course_name})

    if not course:
        return jsonify({"status": False, "message": "Course not found"}), 404

    # Find attendance entry for the given date-time
    attendance_list = course.get("attendance", [])
    for record in attendance_list:
        if date_time in record:
            return jsonify({
                "status": True,
                "dateTime": date_time,
                "present": record[date_time].get("present", []),
                "absent": record[date_time].get("absent", [])
            })

    return jsonify({"status": False, "message": "Attendance not found for the given date-time"}), 404
