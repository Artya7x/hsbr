
from sqlmodel import Session
from app.schemas.organizations import DepartmentCreate
from app.crud.organizations import create_department, get_departments_by_id
from app.crud.accounts import get_organization_by_id

from fastapi import HTTPException
class DepartmentSer:
    
    def __init__(self,db: Session):
        self.db = db

    def create_department_ser(self, data: DepartmentCreate, org_id: int):

        check_org_id = get_organization_by_id(self.db, org_id)
        if not check_org_id:
            raise HTTPException(status_code = 404, detail= "This organization id doesn't exist" )
        
        created_data = create_department(self.db, data, org_id)

        return created_data
    
    def read_department(self, org_id: int):
        departments = get_departments_by_id(self.db, org_id)
        return departments  