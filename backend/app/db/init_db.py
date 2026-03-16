from sqlmodel import SQLModel
from app.db.database import engine
import app.models

def create_db():
    print(SQLModel.metadata.tables.keys())
    SQLModel.metadata.create_all(engine)
  
