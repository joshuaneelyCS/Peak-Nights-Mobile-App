"""
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

    sql = "INSERT INTO users (user_id, first_name, last_name, email, password) VALUES (SUBSTRING(UUID(), 1, 6), %s, %s, %s, %s)"
    val = (data["first_name"], data["last_name"], data["email"], data["password"])
    cursor.execute(sql, val)
    mydb.commit()

    # Query the users's ID number
    sql_uuid_query = "SELECT user_id FROM users WHERE email = %s"
    cursor.execute(sql_uuid_query, (data["email"],))
    user_uuid = cursor.fetchone()[0]

    cursor.close()
    mydb.close()

    return jsonify({'success': True, 'user_id': user_uuid})

@app.route('/login', methods=['POST'])
def login():
    def getLoginData(uid):
        mydb = database.init_db_connection()
        cursor = mydb.cursor()

        user_data_query = "" "
        SELECT first_name, last_name, biography, instagram
        FROM users WHERE user_id = %s"" "
        cursor.execute(user_data_query, (uid,))

        result = cursor.fetchone()

        cursor.close()
        mydb.close()
        
        return result

    data = request.get_json(silent=True)
    
    verified, user_uuid = verifyLogin(data['email'], data['password'])

    if verified is None:  # If no user is found
        return jsonify({'success': False, 'message': 'Sorry! User does not exist'}), 401

    if verified:
        if user_uuid is not None:

            auth_token = create_token(user_uuid)
            
            loginData = getLoginData(user_uuid)

            return jsonify({
                'success': True, 
                'first_name': loginData[0], 
                'last_name': loginData[1],
                'biography': loginData[2],
                'instagram': loginData[3],
                'user_id': user_uuid, 
                'auth_token': auth_token})
        else: 
            return jsonify({'success': False, 'message': 'Something went wrong. No ID associated with account'})
    else:
        return jsonify({'success': False, 'message': 'Invalid email or password'})     

def verifyLogin(email, password):
    
    mydb = database.init_db_connection()
    cursor = mydb.cursor()

    sql_uuid_query = "SELECT password, user_id FROM users WHERE email = %s"
    cursor.execute(sql_uuid_query, (email,))

    result = cursor.fetchone()

    cursor.close()
    mydb.close()

    if result is None:
        return None, None
    else:
        return (result[0] == password), result[1]

@app.route('/setData', methods=['POST'])
def setData():
    data = request.get_json(silent=True)

    mydb = database.init_db_connection()
    cursor = mydb.cursor()

    sql = "" "UPDATE users 
         SET first_name = %s, 
             last_name = %s, 
             biography = %s, 
             instagram = %s 
         WHERE user_id = %s" ""

    val = (
        data["first_name"], 
        data["last_name"], 
        data["biography"], 
        data["instagram"],
        data["user_id"])

    cursor.execute(sql, val)
    mydb.commit()

    cursor.close()
    mydb.close()

    return jsonify({'success': True})

@app.route('/getUsersNotInMembers', methods=['GET'])
def get_users_not_in_members():
    search_query = request.args.get('search', '')

    mydb = database.init_db_connection()
    cursor = mydb.cursor(dictionary=True)  # Use dictionary=True to return dict results

    # ✅ Query: Get users that are NOT in the members table
    sql_query = " ""
        SELECT u.user_id AS id, CONCAT(u.first_name, ' ', u.last_name) AS name 
        FROM users u
        LEFT JOIN members m ON u.user_id = m.user_id
        WHERE m.user_id IS NULL AND (u.first_name LIKE %s OR u.last_name LIKE %s);
    " ""

    cursor.execute(sql_query, (f"%{search_query}%", f"%{search_query}%"))
    users_not_in_members = cursor.fetchall()

    cursor.close()
    mydb.close()

    return jsonify(users_not_in_members)

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
"""