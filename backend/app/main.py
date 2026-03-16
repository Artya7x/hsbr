from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.init_db import create_db
from typing import Annotated
from fastapi import Depends 
from app.models.accounts import Account
from sqlalchemy.orm import  Session
from app.db.database import get_session

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()
    yield

app = FastAPI(lifespan=lifespan)

SessionDep = Annotated[Session, Depends(get_session)]

@app.post('/test')
def create(account: Account, session: SessionDep) -> Account:
    session.add(account)
    session.commit()
    session.refresh(account)
    return account