from flask import Flask, jsonify
from config import Config
from auth import auth
from users import users
from members import members

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(users, url_prefix="/users")
app.register_blueprint(members, url_prefix="/members")

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)