from flask import Blueprint, request, jsonify
from database import get_db_connection

course = Blueprint("course", __name__)

@course.route('/getStages', methods=['GET'])
def get_stages():
    """Dynamically retrieve user data"""
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'success': False, 'message': 'User ID is required'}), 400

    # ✅ Dynamically create SQL query
    try:
        sql = """SELECT * 
                FROM stages 
                ORDER BY stage_order ASC;"""

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        print(f"Executing SQL: {sql}")  # 🔹 Debug SQL query
        cursor.execute(sql)
        stages = cursor.fetchall()

        cursor.close()
        conn.close()

        if not stages:
            return jsonify({'success': False, 'message': 'No stages found'}), 404

        return jsonify({'success': True, 'stages': stages})

    except Exception as e:
        print(f"❌ Error in /getData: {e}")  # 🔹 Print actual error
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@course.route('/getVideosInStages', methods=['GET'])
def get_videos_in_stages():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'success': False, 'message': 'User ID is required'})
    
    sql = "SELECT * FROM join_stages_videos"

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        print(f"Executing SQL: {sql}")  # 🔹 Debug SQL query
        cursor.execute(sql)
        videos = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify({'success': True, 'videos': videos})

    except Exception as e:
        print(f"❌ Error in /getData: {e}")  # 🔹 Print actual error
        return jsonify({'success': False, 'message': 'Internal server error'}), 500
