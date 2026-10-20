from sqlalchemy import Column, Date, Index, Integer, String

from app.db.session import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    department = Column(String(100), nullable=False)
    designation = Column(String(150), nullable=False)
    date_of_joining = Column(Date, nullable=False)

    __table_args__ = (
        Index("ix_employees_name", "name"),
        Index("ix_employees_department", "department"),
    )