from sqlmodel import SQLModel, Field


class Provider(SQLModel, table=True):
    provider_id: int | None = Field(default=None, primary_key=True)
    provider_name: str | None = None
    email: str = Field(unique=True)
    phone: str = Field(unique=True)


class Resource(SQLModel, table=True):
    resource_id: int | None = Field(default=None, primary_key=True)
    resource_name: str | None = None
    provider_id: int | None = Field(default=None, foreign_key="provider.provider_id")


class Impact(SQLModel, table=True):
    impact_id: int | None = Field(default=None, primary_key=True)
    impact_type: str | None = None


class Application(SQLModel, table=True):
    application_id: int | None = Field(default=None, primary_key=True)
    application_name: str | None = None


class Equipment(SQLModel, table=True):
    equipment_id: int | None = Field(default=None, primary_key=True)
    equipment_name: str | None = None