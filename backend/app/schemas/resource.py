from sqlmodel import SQLModel
from typing import Optional


class ProviderBase(SQLModel):
    provider_name: Optional[str] = None
    email: str
    phone: str

class ProviderCreate(ProviderBase):
    pass

class ProviderUpdate(SQLModel):
    provider_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

class ProviderPublic(ProviderBase):
    provider_id: int

    class Config:
        from_attributes = True

class ResourceBase(SQLModel):
    resource_name: Optional[str] = None
    provider_id: Optional[int] = None

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(SQLModel):
    resource_name: Optional[str] = None
    provider_id: Optional[int] = None

class ResourcePublic(ResourceBase):
    resource_id: int

    class Config:
        from_attributes = True

class ImpactBase(SQLModel):
    impact_type: Optional[str] = None
    explanation: Optional[str] = None

class ImpactCreate(ImpactBase):
    pass

class ImpactUpdate(SQLModel):
    impact_type: Optional[str] = None
    explanation: Optional[str] = None

class ImpactPublic(ImpactBase):
    impact_id: int

    class Config:
        from_attributes = True

class ApplicationBase(SQLModel):
    application_name: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(SQLModel):
    application_name: Optional[str] = None

class ApplicationPublic(ApplicationBase):
    application_id: int


    class Config:
        from_attributes = True

class EquipmentBase(SQLModel):
    equipment_name: Optional[str] = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(SQLModel):
    equipment_name: Optional[str] = None

class EquipmentPublic(EquipmentBase):
    equipment_id: int

    class Config:
        from_attributes = True