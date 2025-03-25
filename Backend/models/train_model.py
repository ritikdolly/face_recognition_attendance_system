import face_recognition
import os
import numpy as np
from pymongo import MongoClient
from config import MONGO_URI
from datetime import datetime
import re  # For removing dots from regNo
from db import trained_data_collection as training_collection  # Import from db.py

# Establish MongoDB Connection
client = MongoClient(MONGO_URI)
db = client.face_recognition_db

def train_face_recognition(image_folder, course_name, num_students, teacher_id):
    """Trains face recognition model using images in the specified folder and stores data in MongoDB."""
    
    if not os.path.exists(image_folder):
        raise FileNotFoundError(f"❌ Image folder '{image_folder}' not found!")

    trained_data = []

    for filename in os.listdir(image_folder):
        image_path = os.path.join(image_folder, filename)
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)

        if not encodings:
            print(f"⚠️ No face found in {filename}, skipping...")
            continue  # Skip images without faces

        # Extract regNo (filename without extension) and remove dots
        reg_no = re.sub(r'\.', '', os.path.splitext(filename)[0])

        trained_data.append({
            "regNo": reg_no,  
            "encoding": encodings[0].tolist()
        })

    # Store training data in MongoDB
    training_collection.insert_one({
        "teacherId": teacher_id,  
        "courseName": course_name,
        "numStudents": num_students,
        "trainedData": trained_data,
        "date": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    })

    print(f"✅ {len(trained_data)} students trained successfully!")
    return trained_data

def get_courses_by_teacher(teacher_id):
    """Fetches all courses assigned to a specific teacher."""
    courses = training_collection.find(
        {"teacherId": teacher_id}, 
        {"_id": 0, "courseName": 1, "numStudents": 1, "date": 1}
    )  
    return list(courses)
