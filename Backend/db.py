#db.py
from pymongo import MongoClient
from config import MONGO_URI  # Ensure MONGO_URI is correctly set in config.py

try:
    client = MongoClient(MONGO_URI)
    db = client.face_recognition_db  # Ensure this matches your DB name

    # Check if the database connection is active
    if db is not None:
        trained_data_collection = db["CourseTrainingData"]  # Stores trained data for face recognition
        user_collection = db["teacher"]  # Stores registered users and their credentials

        print("✅ Collections initialized successfully")
    else:
        print("🚨 ERROR: Database connection failed")

    print("✅ MongoDB connected successfully")

except Exception as e:
    print(f"🚨 ERROR: Could not connect to MongoDB: {e}")
    db = None
    trained_data_collection = None
    attendance_summary_collection = None
    student_attendance_collection = None
    user_collection = None
