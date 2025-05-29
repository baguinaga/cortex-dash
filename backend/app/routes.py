from flask import Blueprint, request, jsonify

api_bp = Blueprint('api', __name__)

@api_bp.route('/login', methods=['POST'])
def login():
    # Dummy login: always returns a mock token
    return jsonify({"token": "mock-jwt-token"}), 200

@api_bp.route('/incidents', methods=['GET'])
def get_incidents():
    # Return sample data
    sample_data = [
        {"id": 1, "type": "phishing", "status": "open"},
        {"id": 2, "type": "malware", "status": "closed"}
    ]
    return jsonify(sample_data), 200

@api_bp.route('/incidents', methods=['POST'])
def create_incident():
    data = request.json
    print("Received incident:", data)  # For dev inspection
    return jsonify({"message": "Incident received", "data": data}), 201