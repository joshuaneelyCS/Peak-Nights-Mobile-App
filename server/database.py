import mysql.connector.pooling
from config import Config

# Function connects to the database and returns the database

db_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=5,
    host=Config.DB_HOST,
    user=Config.DB_USER,
    password=Config.DB_PASSWORD,
    database=Config.DB_NAME
)

def get_db_connection():
    return db_pool.get_connection()