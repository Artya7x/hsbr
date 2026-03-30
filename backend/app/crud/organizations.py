from app.schemas.organizations import DepartmentCreate, DepartmentPublic
from app.models.organizations import Department
from sqlmodel import Session, select

def create_department(db:Session, orgData: DepartmentCreate, org_id: int):

    updated_data = orgData.model_copy(update={"org_id": org_id})
    data = Department.model_validate(updated_data)
    db.add(data)
    db.commit()
    db.refresh(data)

    return data

def get_departments_by_id(db: Session, org_id: int):
    sql = select(Department).where(Department.org_id == org_id)
    return db.exec(sql).all()

