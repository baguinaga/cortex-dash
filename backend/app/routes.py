from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api')

# Healthcare metrics data - aligned with frontend config expectations
MOCK_HEALTHCARE_METRICS = {
    "total-patients": {"value": "1,234", "unit": ""},
    "avg-wait-time": {"value": "25", "unit": "min"},
    "er-visits": {"value": "320", "unit": ""},
    "patient-satisfaction": {"value": "92", "unit": "%"}
}

# Daily trends data for charts
MOCK_DAILY_TRENDS = [
    {"date": "2023-05-01", "visits": 105},
    {"date": "2023-05-02", "visits": 120},
    {"date": "2023-05-03", "visits": 98},
    {"date": "2023-05-04", "visits": 112},
    {"date": "2023-05-05", "visits": 135},
    {"date": "2023-05-06", "visits": 140},
    {"date": "2023-05-07", "visits": 122},
]

# Patient table data - aligned with frontend table columns
MOCK_PATIENTS_TABLE = [
    {"patientId": "P001", "name": "Alice Smith", "age": 45, "condition": "Hypertension", "lastVisit": "2023-05-01"},
    {"patientId": "P002", "name": "Bob Johnson", "age": 62, "condition": "Diabetes", "lastVisit": "2023-05-02"},
    {"patientId": "P003", "name": "Charlie Brown", "age": 35, "condition": "Asthma", "lastVisit": "2023-05-02"},
    {"patientId": "P004", "name": "Diana Prince", "age": 29, "condition": "Migraine", "lastVisit": "2023-05-03"},
    {"patientId": "P005", "name": "Ethan Hunt", "age": 51, "condition": "Arthritis", "lastVisit": "2023-05-04"},
]

# At-risk alerts data - new endpoint for frontend config
MOCK_AT_RISK_ALERTS = [
    {
        "id": "alert-001",
        "patientId": "P002",
        "patientName": "Bob Johnson",
        "riskLevel": "high",
        "reason": "Diabetes - elevated blood sugar levels",
        "timestamp": "2023-05-07T10:30:00Z"
    },
    {
        "id": "alert-002", 
        "patientId": "P001",
        "patientName": "Alice Smith",
        "riskLevel": "medium",
        "reason": "Hypertension - missed last appointment",
        "timestamp": "2023-05-07T09:15:00Z"
    },
    {
        "id": "alert-003",
        "patientId": "P005", 
        "patientName": "Ethan Hunt",
        "riskLevel": "medium",
        "reason": "Arthritis - pain medication refill needed",
        "timestamp": "2023-05-07T08:45:00Z"
    }
]

@api_bp.route('/healthcare/metrics', methods=['GET'])
def get_healthcare_metrics():
    """Get healthcare metrics data matching frontend config structure"""
    return jsonify(MOCK_HEALTHCARE_METRICS)

@api_bp.route('/healthcare/daily_trends', methods=['GET'])
def get_healthcare_daily_trends():
    """Get daily trends data for charts"""
    return jsonify(MOCK_DAILY_TRENDS)

@api_bp.route('/healthcare/patients', methods=['GET'])
def get_healthcare_patients():
    """Get patient table data matching frontend table columns"""
    return jsonify(MOCK_PATIENTS_TABLE)

@api_bp.route('/healthcare/at_risk_alerts', methods=['GET'])
def get_healthcare_at_risk_alerts():
    """Get at-risk patient alerts matching frontend alert panel expectations"""
    return jsonify(MOCK_AT_RISK_ALERTS)   