from flask import Flask, request, jsonify
import mysql.connector
import database
import methods
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)

def create_token(user_id):
    payload = {
        'user_id': user_id,
    }
    token = jwt.encode(payload, 'PEAKNIGHTSISAWESOME', algorithm='HS256')
    return token

@app.route('/verify', methods=['POST'])
def verifyMember():

    # Parse JSON
    data = request.get_json(silent=True)  # Use silent=True to avoid exceptions

    if not data or 'membership_id' not in data:
        return jsonify({'success': False, 'message': 'Membership ID not provided'}), 400

    membership_id = data['membership_id']

    # Verification logic
    if membership_id == "11111":
        return jsonify({'success': True, 'message': 'Valid membership ID'})
    else:
        return jsonify({'success': False, 'message': 'Invalid membership ID'}), 401

@app.route('/createUser', methods=['POST'])
def createUser():

    # Parse JSON
    data = request.get_json(silent=True)

    #verifyUserData(data)
   
    mydb = database.init_db_connection()
    cursor = mydb.cursor()

    # TODO - Create a Created At Time field

    sql = "INSERT INTO users (unique_id, first_name, last_name, email, password) VALUES (SUBSTRING(UUID(), 1, 6), %s, %s, %s, %s)"
    val = (data["first_name"], data["last_name"], data["email"], data["password"])
    cursor.execute(sql, val)
    mydb.commit()

    # Query the users's ID number
    sql_uuid_query = "SELECT unique_id FROM users WHERE email = %s"
    cursor.execute(sql_uuid_query, (data["email"],))
    user_uuid = cursor.fetchone()[0]

    cursor.close()
    mydb.close()

    return jsonify({'success': True, 'user_id': user_uuid})

@app.route('/login', methods=['POST'])
def login():
        data = request.get_json(silent=True)

        mydb = database.init_db_connection()
        cursor = mydb.cursor()

        sql_uuid_query = "SELECT password, unique_id FROM users WHERE email = %s"
        cursor.execute(sql_uuid_query, (data["email"],))

        result = cursor.fetchone()

        cursor.close()
        mydb.close()

        if result is None:  # If no user is found
            return jsonify({'success': False, 'message': 'Sorry! User does not exist'}), 401

        password = result[0]
        user_uuid = result[1]
        auth_token = create_token(user_uuid)

        if data["password"] == password:
            return jsonify({'success': True, 'user_id': user_uuid, 'auth_token': auth_token})
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password'})



    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)