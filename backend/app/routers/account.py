from fastapi import APIRouter
from app.db.database import SessionDep
from app.schemas.accounts import AccountCreate, AccountPublic
from app.services.authentication import Authentication

router = APIRouter(
    prefix="/account",
    tags = ["account"]
)


@router.post("/")

def create_account( db: SessionDep, data: AccountCreate ) -> AccountPublic:
    account_obj = Authentication(db)

    return account_obj.register(data)


