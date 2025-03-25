from pymongo import MongoClient
from config import MONGO_URI

# Establish MongoDB Connection
client = MongoClient(MONGO_URI)
db = client.face_recognition_db  # Database name

# ✅ Define the collection explicitly
users_collection = db["teacher"]  # Ensuring collection name is set correctly

def create_user(user_data):
    existing_user = users_collection.find_one({"username": user_data["username"]})
    if existing_user:
        return {"status": False, "message": "Username already exists"}

    users_collection.insert_one(user_data)
    return {"status": True, "message": "User registered successfully"}

def find_user(username):
    return users_collection.find_one({"username": username})
