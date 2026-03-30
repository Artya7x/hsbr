from sqlmodel import SQLModel, Field
from typing import Optional


class AccountBase(SQLModel):
    email: str 
    role: str

class AccountCreate(AccountBase):
    password: str

class AccountUpdate(SQLModel):
    email: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None

class AccountPublic(AccountBase):
    account_id: int

    class Config:
        from_attributes = True

class ConsultantBase(SQLModel):
    name: str
    surname: str
    phone: str 
    logo: Optional[str] = None
    account_id: int

class ConsultantCreate(ConsultantBase):
    pass

class ConsultantUpdate(SQLModel):
    name: Optional[str] = None
    surname: Optional[str] = None
    phone: Optional[str] = None
    logo: Optional[str] = None

class ConsultantPublic(ConsultantBase):
    consultant_id: int

    class Config:
        from_attributes = True

class OrganizationBase(SQLModel):
    org_name: str
    phone: str 
    logo: Optional[str] = None
    

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationUpdate(SQLModel):
    org_name:  Optional[str] = None
    phone:  Optional[str] = None 
    logo:  Optional[str] = None

class OrganizationPublic(OrganizationBase):
    org_id: int
    account_id: Optional[int]
    class Config:
        from_attributes = True