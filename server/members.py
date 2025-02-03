from flask import Blueprint, request, jsonify
from database import get_db_connection

members = Blueprint("members", __name__)

@members.route('/verify', methods=['POST'])
def verify_member():
    """Verify membership ID"""
    data = request.get_json(silent=True)

    if not data or 'membership_id' not in data:
        return jsonify({'success': False, 'message': 'Membership ID not provided'}), 400

    return jsonify({
        'success': True if data['membership_id'] == "11111" else False,
        'message': 'Valid membership ID' if data['membership_id'] == "11111" else 'Invalid membership ID'
    })

@members.route('/searchMembers', methods=['GET'])
def search_members():
    search_query = request.args.get('search', '')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ✅ Query: Get only users who are members
    sql_query = """
    SELECT u.user_id AS id, CONCAT(u.first_name, ' ', u.last_name) AS name 
    FROM users u
    JOIN members m ON u.user_id = m.user_id
    WHERE u.first_name LIKE %s OR u.last_name LIKE %s;
    """

    cursor.execute(sql_query, (f"%{search_query}%", f"%{search_query}%"))
    search_results = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(search_results)

@members.route('/addMember', methods=['POST'])
def add_member():
    data = request.get_json(silent=True)
    sql = """INSERT INTO members (user_id) VALUES (%s)"""

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(sql, (data['user_id'],))
        conn.commit()

        affected_rows = cursor.rowcount

        cursor.close()
        conn.close()

        if affected_rows == 0:
            return jsonify({'success': False, 'message': 'Error inserting member'})

        return jsonify({'success': True, 'Message': 'User is now a member'})
    
    except Exception as error:
        print(error)


@members.route('/searchUsersNotInMembers', methods=['GET'])
def search_users_not_in_members():
    search_query = request.args.get('search', '')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # ✅ Query: Get users that are NOT in the members table
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

    return jsonify(users_not_in_members)