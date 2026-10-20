from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import Base, engine
from app.models.employee import Employee  # Registers the model
from app.routers.employee_router import router as employee_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verify the database connection during startup.
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    # Development convenience only. Use migrations in production.
    Base.metadata.create_all(bind=engine)

    yield

    engine.dispose()


app = FastAPI(
    title="Employee Directory API",
    description="Search and view employee directory records.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://employee-directory-search-system-cc.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Employee Directory API is running"}


app.include_router(employee_router)