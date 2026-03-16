from sqlmodel import SQLModel, Field

class ActivityApplication(SQLModel, table=True):
    activity_id: int = Field(foreign_key="activities.activity_id", primary_key=True)
    application_id: int = Field(foreign_key="application.application_id", primary_key=True)


class ActivityEquipment(SQLModel, table=True):
    equipment_id: int = Field(foreign_key="equipment.equipment_id", primary_key=True)
    activity_id: int = Field(foreign_key="activities.activity_id", primary_key=True)


class ActivityProvider(SQLModel, table=True):
    provider_id: int = Field(foreign_key="provider.provider_id", primary_key=True)
    activity_id: int = Field(foreign_key="activities.activity_id", primary_key=True)


class ActivityImpact(SQLModel, table=True):
    activity_id: int = Field(foreign_key="activities.activity_id", primary_key=True)
    impact_id: int = Field(foreign_key="impact.impact_id", primary_key=True)