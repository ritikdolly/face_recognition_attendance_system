from flask import Blueprint, request, jsonify
from datetime import datetime
from db import trained_data_collection as training_collection, attendance_summary_collection, student_attendance_collection

attendance_bp = Blueprint("attendance", __name__)

def mark_student_attendance(course, present_students, absent_students):
    student_attendance_collection.insert_one({
        "course": course,
        "present_students": present_students,
        "absent_students": absent_students,
        "date": datetime.now()
    })

@attendance_bp.route("/take_attendance", methods=["POST"])
def take_attendance():
    data = request.json
    teacher_id = data.get("teacherId")
    course = data.get("course")
    recognized_students = data.get("encoding", [])

    trained_course = training_collection.find_one({"teacherId": teacher_id, "courseName": course})
    if not trained_course:
        return jsonify({"error": "Course or teacher ID not found in trained data"}), 404

    total_students = trained_course["trainedData"]
    total_regNos = {student["regNo"] for student in total_students}
    present_students = set(recognized_students)
    absent_students = list(total_regNos - present_students)

    mark_student_attendance(course, list(present_students), absent_students)

    attendance_data = {
        "course": course,
        "total_students": len(total_regNos),
        "present_students": len(present_students),
        "absent_students": len(absent_students),
        "status": "Completed",
        "timestamp": datetime.now()
    }
    
    attendance_summary_collection.insert_one(attendance_data)
    return jsonify({"message": "Attendance recorded successfully", "summary": attendance_data})
