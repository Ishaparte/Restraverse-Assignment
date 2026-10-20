from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.employee import EmployeeResponse
from app.services.employee_service import get_employees

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.get("/", response_model=list[EmployeeResponse])
def list_employees(
    search: Annotated[
        str | None,
        Query(max_length=100, description="Search by name or department"),
    ] = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
    offset: Annotated[int, Query(ge=0)] = 0,
    db: Session = Depends(get_db),
):
    try:
        return get_employees(
            db=db,
            search=search,
            limit=limit,
            offset=offset,
        )
    except SQLAlchemyError as exc:
        # Record technical details in server logs in a production app.
        raise HTTPException(
            status_code=503,
            detail="Employee data is temporarily unavailable. Please try again.",
        ) from exc