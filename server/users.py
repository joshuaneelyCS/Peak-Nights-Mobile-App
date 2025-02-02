from flask import Blueprint, request, jsonify
from database import get_db_connection
from auth import hash_password

users = Blueprint("users", __name__)

# Contains all user-related endpoints

@users.route('/createUser', methods=['POST'])
def create_user():
    """Create a new user"""
    data = request.get_json()
    print(data)
    hashed_password = hash_password(data["password"])

    # username
    sql = """INSERT INTO users (
    user_id, 
    first_name, 
    last_name, 
    email, 
    password_hash) 
    VALUES (SUBSTRING(UUID(), 1, 10), %s, %s, %s, %s)"""

    val = (data["first_name"], 
           data["last_name"], 
           data["email"], 
           hashed_password)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(sql, val)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'success': True, 'message': 'User created successfully'})

    except Exception as e:
        print("Error:", e)
        return jsonify({'success': False, 'message': str(e)}), 500

@users.route('/setData', methods=['POST'])
def set_user_data():
    """Dynamically update user data"""
    data = request.get_json()

    # Validate request
    if not data or 'user_id' not in data:
        return jsonify({'success': False, 'message': 'User ID is required'}), 400

    user_id = data.pop('user_id')  # Remove user_id from data dictionary

    if not data:
        return jsonify({'success': False, 'message': 'No fields provided to update'}), 400

    # Dynamically create SQL query
    set_clause = ", ".join([f"{key} = %s" for key in data.keys()])
    values = list(data.values()) + [user_id]

    sql = f"UPDATE users SET {set_clause} WHERE user_id = %s"

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'success': True, 'message': 'User data updated successfully'})


@users.route('/getData', methods=['GET'])
def get_user_data():
    """Dynamically retrieve user data"""
    user_id = request.args.get('user_id')

    # ✅ Debugging: Print received values
    print(f"Received user_id: {user_id}")
    print(f"Raw fields param: {request.args}")

    # ✅ Handle both `fields` and `fields[]` correctly
    fields = request.args.getlist('fields') or request.args.getlist('fields[]')  # Get list of fields

    print(f"Processed fields: {fields}")

    if not user_id or not fields:
        return jsonify({'success': False, 'message': 'User ID and fields are required'}), 400

    # Validate fields before querying
    allowed_fields = {"first_name", "last_name", "email", "biography", "instagram"}
    invalid_fields = set(fields) - allowed_fields
    if invalid_fields:
        return jsonify({'success': False, 'message': f'Invalid fields: {invalid_fields}'}), 400

    # ✅ Dynamically create SQL query
    try:
        fields_sql = ", ".join(fields)
        sql = f"SELECT {fields_sql} FROM users WHERE user_id = %s"

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        print(f"Executing SQL: {sql} with user_id={user_id}")  # 🔹 Debug SQL query
        cursor.execute(sql, (user_id,))
        user_data = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user_data:
            return jsonify({'success': False, 'message': 'User not found'}), 404

        return jsonify({'success': True, 'user_data': user_data})

    except Exception as e:
        print(f"❌ Error in /getData: {e}")  # 🔹 Print actual error
        return jsonify({'success': False, 'message': 'Internal server error'}), 500