from flask import Blueprint, request, jsonify
from database import get_db_connection

membership = Blueprint("membership", __name__)

@membership.route('/verify', methods=['POST'])
def verify_member():
    """Verify membership ID"""
    data = request.get_json(silent=True)

    if not data or 'membership_id' not in data:
        return jsonify({'success': False, 'message': 'Membership ID not provided'}), 400

    return jsonify({
        'success': True if data['membership_id'] == "11111" else False,
        'message': 'Valid membership ID' if data['membership_id'] == "11111" else 'Invalid membership ID'
    })

@membership.route('/getUsersNotInMembers', methods=['GET'])
def get_users_not_in_members():
    """Fetch users who are NOT members"""
    search_query = request.args.get('search', '')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Fetch results as a dictionary

    sql_query = """
        SELECT u.user_id AS id, CONCAT(u.first_name, ' ', u.last_name) AS name 
        FROM users u
        LEFT JOIN members m ON u.user_id = m.user_id
        WHERE m.user_id IS NULL AND (u.first_name LIKE %s OR u.last_name LIKE %s);
    """
    
    cursor.execute(sql_query, (f"%{search_query}%", f"%{search_query}%"))
    users_not_in_members = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify({'success': True, 'users': users_not_in_members})