from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.employee import Employee


def search_employees(
    db: Session,
    search: str | None,
    limit: int,
    offset: int,
):
    statement = select(Employee)

    if search:
        pattern = f"{search}%"

        statement = statement.where(
            or_(
                Employee.name.like(pattern),
                Employee.department.like(pattern),
            )
        )

    statement = (
        statement
        .order_by(Employee.name, Employee.id)
        .limit(limit)
        .offset(offset)
    )

    return db.scalars(statement).all()