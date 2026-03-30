from sqlmodel import SQLModel, Field
from datetime import date

class TemplateParameters(SQLModel, table=True):
    template_id: int | None = Field(default=None, primary_key=True)
    name: str | None = None


class TemplateVersion(SQLModel, table=True):
    version_id: int | None = Field(default=None, primary_key=True)
    min_threshold: int
    max_threshold: int
    is_active: bool | None = None
    template_id: int | None = Field(default=None, foreign_key="templateparameters.template_id")


class Interval(SQLModel, table=True):
    interval_id: int | None = Field(default=None, primary_key=True)
    interval_number: int
    version_id: int = Field(foreign_key="templateversion.version_id")


class Survey(SQLModel, table=True):
    survey_id: int | None = Field(default=None, primary_key=True)
    survey_code: str
    review_date: date
    version: str
    org_id: int = Field(foreign_key="organization.org_id")
    departments_id: int = Field(foreign_key="department.departments_id")
    template_id: int | None = Field(default=None, foreign_key="templateparameters.template_id")
    version_id: int | None = Field(default=None, foreign_key="templateversion.version_id")