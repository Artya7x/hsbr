from app.schemas.accounts import OrganizationCreate, AccountCreate
from app.models.accounts import Organization, Account
from sqlmodel import Session, select

def create_organization(db:Session, org_data : OrganizationCreate ):
    db_org = Organization.model_validate(org_data)
    db.add(db_org)
    db.commit()
    db.refresh(db_org)

    return db_org

def read_organizations(db:Session ):

    sql = select(Organization)
    return db.exec(sql).all()


def create_account(db:Session, account_data : AccountCreate ):

    db_account = Account.model_validate(account_data)
    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return db_account

def get_account_by_email(db: Session, email: str):
    sql = select(Account).where(Account.email == email)
    return db.exec(sql).first()

def get_organization_by_id(db: Session, org_id: int):
    sql = select(Organization).where(Organization.org_id == org_id)
    return db.exec(sql).first()

