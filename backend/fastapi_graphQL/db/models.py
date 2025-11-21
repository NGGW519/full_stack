# models.py
# database.py에 연동된 DB를 가지고 table만들기
from sqlalchemy import Column, Integer, String
from database import connect_to_db  # database를 불러오는 파일에서 connect_to_db 를 import해오기


class EmployeeModel(connect_to_db):
    # 리액트와 연동하므로 리액트와 동일하게 짜야한다.
    # 이게 실행되면 table 만들어짐
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    salary = Column(Integer, nullable=False)
    job = Column(String(100), nullable=False)
    language = Column(String(100))
    pay = Column(String(100), nullable=False)
