from sqlmodel import SQLModel, Field


class Activities(SQLModel, table=True):
    activity_id: int | None = Field(default=None, primary_key=True)
    activity_name: str | None = None
    rto: int
    rpo: str
    mtpd: int
    frequency: int | None = None
    duration: int | None = None
    criticality: str | None = None
    stuff_number: int | None = None
    process_description: str | None = None
    workstations: int | None = None
    fire_protection: bool | None = None
    impact_description: str | None = None
    survey_id: int = Field(foreign_key="survey.survey_id")


class ActivityDependency(SQLModel, table=True):
    upstream_id: int = Field(foreign_key="activities.activity_id", primary_key=True)
    downstream_id: int = Field(foreign_key="activities.activity_id", primary_key=True)


class Physical(SQLModel, table=True):
    physical_id: int | None = Field(default=None, primary_key=True)
    physical_docs_name: str | None = None
    physical_criticality: str | None = None
    activity_id: int = Field(foreign_key="activities.activity_id")


class ActivityIntervalImpact(SQLModel, table=True):
    activity_id: int = Field(foreign_key="activities.activity_id", primary_key=True)
    interval_id: int = Field(foreign_key="interval.interval_id", primary_key=True)
    severity: str | None = None