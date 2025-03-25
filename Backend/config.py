import os

MONGO_URI = "mongodb://localhost:27017/face_recognition_db"
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
ALLOWED_EXTENSIONS = {"zip"}

# Create upload directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)