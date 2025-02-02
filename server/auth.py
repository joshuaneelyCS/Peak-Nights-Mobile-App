from flask import Blueprint, request, jsonify
from database import get_db_connection
import jwt
import bcrypt
from config import Config

auth = Blueprint("auth", __name__)

def hash_password(password):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(stored_password, provided_password):
    return bcrypt.checkpw(provided_password.encode(), stored_password.encode())

def create_auth_token(user_id):
    payload = {'user_id': user_id}
    token = jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')
    return token

# Returns an auth_token and user_id
@auth.route('/login', methods=['POST'])
def login():
    """User login route"""
    data = request.get_json()
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute(
        """SELECT password_hash, user_id 
        FROM users WHERE email = %s""", (data["email"],))
    result = cursor.fetchone()
    
    cursor.close()
    conn.close()

    if not result:
        return jsonify({'success': False, 'message': 'Account does not exist'}), 401
    elif not verify_password(result[0], data["password"]):
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    auth_token = create_auth_token(result[1])

    return jsonify({'success': True, 'auth_token': auth_token, 'user_id': result[1]})