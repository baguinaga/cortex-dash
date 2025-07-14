from flask import Blueprint, jsonify

api_bp = Blueprint('api', __name__, url_prefix='/api')

# ----- Healthcare Mock Data -----

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

# ----- Pharmacy Mock Data -----

MOCK_PHARMACY_KPIS = {
    "total-revenue": {"value": 750000, "unit": "USD"},
    "avg-turnaround-time": {"value": 2.5, "unit": "hours"},
    "patient-adherence-pdc": {"value": 89, "unit": "%"},
    "scripts-filled": {"value": 1240, "unit": ""}
}

MOCK_REVENUE_TRENDS = [
    {"date": "2025-05-01", "revenue": 180000},
    {"date": "2025-05-08", "revenue": 210000},
    {"date": "2025-05-15", "revenue": 195000},
    {"date": "2025-05-22", "revenue": 230000},
    {"date": "2025-05-29", "revenue": 250000}
]

MOCK_TOP_DRUGS_BY_REVENUE = [
    {"drugName": "Adalimumab", "revenue": 150000},
    {"drugName": "Pembrolizumab", "revenue": 120000},
    {"drugName": "Apixaban", "revenue": 95000},
    {"drugName": "Etanercept", "revenue": 80000},
    {"drugName": "Rituximab", "revenue": 65000}
]

MOCK_RECENT_SCRIPTS = [
    {"scriptId": "RX78901", "drugName": "Infliximab", "patientName": "John Doe", "prescriber": "Dr. Smith", "fillDate": "2025-05-15", "status": "Awaiting Patient Pickup", "revenue": 4500},
    {"scriptId": "RX78902", "drugName": "Trastuzumab", "patientName": "Jane Roe", "prescriber": "Dr. Jones", "fillDate": "2025-05-15", "status": "Filled", "revenue": 8200},
    {"scriptId": "RX78903", "drugName": "Lenalidomide", "patientName": "Peter Pan", "prescriber": "Dr. Ahab", "fillDate": "2025-05-14", "status": "Pending Insurance", "revenue": 6700},
    {"scriptId": "RX78904", "drugName": "Ibrutinib", "patientName": "Mary Poppins", "prescriber": "Dr. Smith", "fillDate": "2025-05-14", "status": "Filled", "revenue": 7100},
    {"scriptId": "RX78905", "drugName": "Glatiramer Acetate", "patientName": "James Kirk", "prescriber": "Dr. McCoy", "fillDate": "2025-05-13", "status": "Canceled", "revenue": 0},
    {"scriptId": "RX78906", "drugName": "Adalimumab", "patientName": "Jean-Luc Picard", "prescriber": "Dr. Crusher", "fillDate": "2025-05-16", "status": "Awaiting Patient Pickup", "revenue": 5200},
]

# Notifications are derived from scripts that require attention
MOCK_NOTIFICATIONS = [
    {
        "id": f"notif-{script['scriptId']}",
        "patientName": script['patientName'],
        "riskLevel": "medium",
        "reason": f"Script {script['scriptId']} ({script['drugName']}) is awaiting patient pickup."
    }
    for script in MOCK_RECENT_SCRIPTS if script["status"] == "Awaiting Patient Pickup"
]

# Monthly trends data for area chart
MOCK_MONTHLY_TRENDS = [
    {"month": "Jan 2025", "revenue": 680000},
    {"month": "Feb 2025", "revenue": 720000},
    {"month": "Mar 2025", "revenue": 750000},
    {"month": "Apr 2025", "revenue": 780000},
    {"month": "May 2025", "revenue": 820000},
    {"month": "Jun 2025", "revenue": 850000},
    {"month": "Jul 2025", "revenue": 890000},
    {"month": "Aug 2025", "revenue": 920000},
    {"month": "Sep 2025", "revenue": 880000},
    {"month": "Oct 2025", "revenue": 940000},
    {"month": "Nov 2025", "revenue": 980000},
    {"month": "Dec 2025", "revenue": 1020000}
]

# ----- Healthcare API endpoints -----

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

# ----- Pharmacy API endpoints -----

@api_bp.route('/pharmacy/kpis', methods=['GET'])
def get_pharmacy_kpis():
    """Get pharmacy KPI data"""
    return jsonify(MOCK_PHARMACY_KPIS)

@api_bp.route('/pharmacy/revenue_trends', methods=['GET'])
def get_pharmacy_revenue_trends():
    """Get revenue trends for charts"""
    return jsonify(MOCK_REVENUE_TRENDS)

@api_bp.route('/pharmacy/drugs_by_revenue', methods=['GET'])
def get_drugs_by_revenue():
    """Get top drugs sorted by revenue"""
    return jsonify(MOCK_TOP_DRUGS_BY_REVENUE)

@api_bp.route('/pharmacy/recent_scripts', methods=['GET'])
def get_pharmacy_recent_scripts():
    """Get recently submitted scripts"""
    return jsonify(MOCK_RECENT_SCRIPTS) 

# TODO:A future '/script_details/<id>' endpoint would be used for drill-downs.
# @api_bp.route('/pharmacy/script_details/<id>', methods=['GET'])
# def get_pharmacy_script_status():

@api_bp.route('/pharmacy/notifications', methods=['GET'])
def get_pharmacy_alerts():
    """Get new script notifications"""
    return jsonify(MOCK_NOTIFICATIONS)

@api_bp.route('/pharmacy/monthly_trends', methods=['GET'])
def get_pharmacy_monthly_trends():
    """Get monthly revenue trends for area chart"""
    return jsonify(MOCK_MONTHLY_TRENDS)