from sqlmodel import Session
from app.schemas.accounts import AccountCreate
from app.crud.accounts import create_account, get_account_by_email
from app.core.security import hash_password
from fastapi import HTTPException

class Authentication:
    def __init__(self, db: Session):
        self.db = db
    
    def register(self, data: AccountCreate):

        email_exists = get_account_by_email(self.db , data.email)

        if email_exists:
            raise HTTPException(status_code = 409 ,detail = "Email already exists")

        hashed_password = hash_password(data.password)
        updated_data = data.model_copy(update={"password": hashed_password})
        account = create_account(self.db, updated_data)
        return account