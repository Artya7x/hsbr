from sqlmodel import SQLModel, Field


class Department(SQLModel, table=True):
    departments_id: int | None = Field(default=None, primary_key=True)
    departments_name: str
    org_id: int = Field(foreign_key="organization.org_id")


class Manual(SQLModel, table=True):
    manual_id: int | None = Field(default=None, primary_key=True)
    date_of_use: str | None = None
    belongs: bool | None = None
    day_of_creation: str | None = None
    org_id: int = Field(foreign_key="organization.org_id")