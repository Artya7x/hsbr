from sqlmodel import create_engine
import os
from dotenv import load_dotenv

from typing import Annotated
from fastapi import Depends 
from sqlmodel import  Session

load_dotenv()

DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")


engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

