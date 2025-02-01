import mysql.connector
from mysql.connector import pooling

# Function connects to the database and returns the database
def init_db_connection():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="lowdownJN",
        database="users",
    )

    return mydb