
from app.schemas.accounts import OrganizationCreate, OrganizationUpdate
from app.crud.accounts import create_organization, read_organizations, update_organization, get_organization_by_id
from fastapi import HTTPException
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


    def update_organization_ser(self, org_id: int, org_data: OrganizationUpdate):
        
        org = get_organization_by_id(self.db, org_id)
        if not org:
            raise HTTPException(status_code = 404, detail= "Something went wrong")
        
        updated_data = update_organization(self.db, org_id, org_data)

        return updated_data
        
