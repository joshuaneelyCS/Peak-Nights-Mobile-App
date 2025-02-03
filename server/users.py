from flask import Blueprint, request, jsonify
from database import get_db_connection
from auth import hash_password, create_auth_token
import uuid

users = Blueprint("users", __name__)

# Contains all user-related endpoints

@users.route('/createUser', methods=['POST'])
def create_user():
    """Create a new user"""
    data = request.get_json()

    hashed_password = hash_password(data["password"])
    user_id = str(uuid.uuid4())[24:34].upper()

    # username
    sql = """INSERT INTO users (
    user_id, 
    first_name, 
    last_name, 
    email, 
    password_hash) 
    VALUES (%s, %s, %s, %s, %s)"""

    val = (user_id,
           data["first_name"], 
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

        # I need to fetch the user id somewhere here.
        # How should I do it? Should i make a separate func
        # How would I do this? I don't want to make a another
        # Query with email, but is this the only way
        
        auth_token = create_auth_token(user_id)

        return jsonify({'success': True, 'auth_token': auth_token, 'user_id': user_id})

    except Exception as e:
        print("Error:", e)
        return jsonify({'success': False, 'message': str(e)}), 500

@users.route('/setData', methods=['POST'])
def set_user_data():
    """Dynamically update user data for multiple tables"""
    data = request.get_json()

    if not data or 'user_id' not in data:
        return jsonify({'success': False, 'message': 'Valid user_id is required for request'}), 400
    user_id = data.pop('user_id')
    print(user_id)

    # Validate request
    if not data or 'key' not in data:
        return jsonify({'success': False, 'message': 'Key is required for update'}), 400

    key = data.pop('key')  # Extract key object (conditions for WHERE clause)

    if not isinstance(key, dict) or not key:
        return jsonify({'success': False, 'message': 'Key must be a non-empty dictionary'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        for table, fields in data.items():
            print("Table: ", table)
            print("Fields: ", fields)
            if not isinstance(fields, dict) or not fields:
                continue  # Skip empty or invalid table updates

            # Generate SET clause dynamically
            set_clause = ", ".join([f"{col} = %s" for col in fields.keys()])
            values = list(fields.values())

            # Generate WHERE clause dynamically
            where_clause = " AND ".join([f"{col} = %s" for col in key.keys()])
            values += list(key.values())
            values = tuple(values)  # Add key values for WHERE condition
            print("Values: ", values)

            sql = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
            print(sql)
            cursor.execute(sql, values)

        conn.commit()  # Commit all updates in a single transaction
        return jsonify({'success': True, 'message': 'User data updated successfully'})

    except Exception as e:
        print(str(e))
        conn.rollback()  # Rollback if there's an error
        return jsonify({'success': False, 'message': str(e)}), 500

    finally:
        cursor.close()
        conn.close()

@users.route('/getData', methods=['GET'])
def get_user_data():
    """Dynamically retrieve user data"""
    user_id = request.args.get('user_id')
    table = request.args.get('table')

    # ✅ Debugging: Print received values
    print(f"Received user_id: {user_id}")
    print(f"Raw fields param: {request.args}")

    # ✅ Handle both `fields` and `fields[]` correctly
    fields = request.args.getlist('fields') or request.args.getlist('fields[]')  # Get list of fields

    print(f"Processed fields: {fields}")

    if not user_id or not fields:
        return jsonify({'success': False, 'message': 'User ID and fields are required'}), 400
    
    # ✅ Define allowed tables and their fields (prevents SQL Injection)
    allowed_tables = {
        "users": {"first_name", "last_name", "email", "biography", "instagram"},
        "user_profiles": {"user_id", "profile_picture", "phone", "fun_facts"}
    }

    if table not in allowed_tables:
        return jsonify({'success': False, 'message': 'Invalid table name'}), 400

    # Validate fields before querying
    allowed_fields = {"first_name", "last_name", "email", "biography", "instagram"}
    invalid_fields = set(fields) - allowed_fields
    if invalid_fields:
        return jsonify({'success': False, 'message': f'Invalid fields: {invalid_fields}'}), 400

    # ✅ Dynamically create SQL query
    try:
        fields_sql = ", ".join(fields)
        sql = f"SELECT {fields_sql} FROM {table} WHERE user_id = %s"

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