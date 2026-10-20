from sqlalchemy.orm import Session

from app.repositories.employee_repository import search_employees


def get_employees(
    db: Session,
    search: str | None,
    limit: int,
    offset: int,
):
    normalized_search = search.strip() if search else None

    if normalized_search == "":
        normalized_search = None

    return search_employees(
        db=db,
        search=normalized_search,
        limit=limit,
        offset=offset,
    )