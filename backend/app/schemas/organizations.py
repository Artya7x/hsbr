from sqlmodel import SQLModel
from typing import Optional


class DepartmentBase(SQLModel):
    departments_name: str
    

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(SQLModel):
    departments_name: Optional[str] = None
    org_id: int

class DepartmentPublic(DepartmentBase):
    departments_id: int
    org_id: int

class ManualBase(SQLModel):
    date_of_use: Optional[str] = None
    belongs: Optional[bool] = None
    day_of_creation: Optional[str] = None
    org_id: int

class ManualCreate(ManualBase):
    pass

class ManualUpdate(SQLModel):
    date_of_use: Optional[str] = None
    belongs: Optional[bool] = None
    day_of_creation: Optional[str] = None
    org_id: Optional[int] = None

class ManualPublic(ManualBase):
    manual_id: int
