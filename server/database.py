import mysql.connector

def init_db_connection():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="lowdownJN",
        database="users",
    )

    return mydb