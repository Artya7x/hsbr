
from app.schemas.accounts import OrganizationCreate
from app.crud.accounts import create_organization, read_organizations

from sqlmodel import Session

class OrganizationSer:
    def __init__(self, db: Session ):
        self.db = db

    def create_organization_ser(self, data: OrganizationCreate ):
    
        org = create_organization(self.db, data)

        return org

    def read_organization_ser(self):
        
        org_data = read_organizations(self.db)

        return org_data

