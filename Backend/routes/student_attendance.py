from db import student_attendance_collection
from datetime import datetime

def mark_student_attendance(course, present_students, absent_students):
    """
    Save detailed student attendance records in MongoDB.
    """
    attendance_details = {
        "course": course,
        "present_students": present_students,
        "absent_students": absent_students,
        "date": datetime.now()
    }
    student_attendance_collection.insert_one(attendance_details)
