import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "PEAKNIGHTSISAWESOME")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "lowdownJN")
    DB_NAME = os.getenv("DB_NAME", "peak_nights")

