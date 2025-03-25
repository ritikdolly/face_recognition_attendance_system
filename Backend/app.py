from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.attendance import attendance_bp

app = Flask(__name__)

# Proper CORS configuration for handling preflight requests
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True, methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"], allow_headers=["Content-Type", "Authorization"])

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")  
app.register_blueprint(attendance_bp, url_prefix="/api/attendance")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
