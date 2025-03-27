from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.attendance import attendance_bp # Import the attendance blueprint

app = Flask(__name__)

# Configure CORS properly
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")  
app.register_blueprint(attendance_bp, url_prefix="/api/attendance")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
