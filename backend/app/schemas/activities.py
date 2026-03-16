from sqlmodel import SQLModel
from typing import Optional


class ActivitiesBase(SQLModel):
    activity_name: Optional[str] = None
    rto: int
    rpo: int
    mtpd: int
    frequency: Optional[int] = None
    duration: Optional[int] = None
    criticality: Optional[str] = None
    stuff_number: Optional[int] = None
    process_description: Optional[str] = None
    workstations: Optional[int] = None
    fire_protection: Optional[bool] = None
    survey_id: int

class ActivitiesCreate(ActivitiesBase):
    pass

class ActivitiesUpdate(SQLModel):
    activity_name: Optional[str] = None
    rto: Optional[int] = None
    rpo: Optional[int] = None
    mtpd: Optional[int] = None
    frequency: Optional[int] = None
    duration: Optional[int] = None
    criticality: Optional[str] = None
    stuff_number: Optional[int] = None
    process_description: Optional[str] = None
    workstations: Optional[int] = None
    fire_protection: Optional[bool] = None

class ActivitiesPublic(ActivitiesBase):
    activity_id: int


class PhysicalBase(SQLModel):
    physical_docs_name: Optional[str] = None
    physical_criticality: Optional[str] = None
    activity_id: int

class PhysicalCreate(PhysicalBase):
    pass

class PhysicalUpdate(SQLModel):
    physical_docs_name: Optional[str] = None
    physical_criticality: Optional[str] = None
    activity_id: Optional[int] = None

class PhysicalPublic(PhysicalBase):
    physical_id: int
