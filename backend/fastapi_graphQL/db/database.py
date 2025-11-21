# database.py

####################### DB 연동하기 #######################
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

def connect_to_db(db_url):
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")
    engine = create_engine(
        DATABASE_URL,
        echo=True,
        future=True
    )
    Session = sessionmaker(bind=engine, autocommit=False, expire_on_commit=False)
    Base = declarative_base() # DB가 필요한 파일에서 Base를 import해서 쓴다.
    return Base, Session
##########################################################