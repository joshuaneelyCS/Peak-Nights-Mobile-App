from flask import Blueprint, request, jsonify
from database import get_db_connection

course = Blueprint("course", __name__)

@course.route('/getStages', methods=['GET'])
def get_stages():
    """Dynamically retrieve user data"""
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'success': False, 'message': 'User ID and fields are required'}), 400

    # ✅ Dynamically create SQL query
    try:
        sql = "SELECT stage_id FROM stages"

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        print(f"Executing SQL: {sql}")  # 🔹 Debug SQL query
        cursor.execute(sql)
        stages = cursor.fetchall()

        cursor.close()
        conn.close()

        if not stages:
            return jsonify({'success': False, 'message': 'No stages found'}), 404

        # Convert to a list of stage_id values
        stage_ids = [row['stage_id'] for row in stages]

        return jsonify({'success': True, 'stage_ids': stage_ids})

    except Exception as e:
        print(f"❌ Error in /getData: {e}")  # 🔹 Print actual error
        return jsonify({'success': False, 'message': 'Internal server error'}), 500