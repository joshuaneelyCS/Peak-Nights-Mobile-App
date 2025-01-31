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
        
        verified, user_uuid = verifyLogin(data['email'], data['password'])

        if verified is None:  # If no user is found
            return jsonify({'success': False, 'message': 'Sorry! User does not exist'}), 401

        if verified:
            if user_uuid is not None:

                auth_token = create_token(user_uuid)
                
                loginData = getLoginData(user_uuid)
                
                return jsonify({'success': True, 'first_name': loginData['first_name'], 'last_name': loginData['last_name'],'user_id': user_uuid, 'auth_token': auth_token})
            else: 
                return jsonify({'success': False, 'message': 'Something went wrong. No ID associated with account'})
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password'})
        

def verifyLogin(email, password):
    
    mydb = database.init_db_connection()
    cursor = mydb.cursor()

    sql_uuid_query = "SELECT password, unique_id FROM users WHERE email = %s"
    cursor.execute(sql_uuid_query, (email,))

    result = cursor.fetchone()

    cursor.close()
    mydb.close()

    if result[0] is None:
        return None
    else:
        return (result[0] == password), result[1]

def getLoginData(uid):
    mydb = database.init_db_connection()
    cursor = mydb.cursor()

    user_data_query = "SELECT first_name, last_name FROM users WHERE unique_id = %s"
    cursor.execute(user_data_query, (uid,))

    result = cursor.fetchone()
    data = {'first_name': result[0], 'last_name': result[1]}

    cursor.close()
    mydb.close()
    
    return data
    

    






    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)