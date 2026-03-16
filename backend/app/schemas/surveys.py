from sqlmodel import SQLModel
from typing import Optional
from datetime import date

class TemplateParametersBase(SQLModel):
    name: Optional[str] = None

class TemplateParametersCreate(TemplateParametersBase):
    pass

class TemplateParametersUpdate(SQLModel):
    name: Optional[str] = None

class TemplateParametersPublic(TemplateParametersBase):
    template_id: int

class TemplateVersionBase(SQLModel):
    min_threshold: int
    max_threshold: int
    is_active: Optional[bool] = None
    template_id: int

class TemplateVersionCreate(TemplateVersionBase):
    pass

class TemplateVersionUpdate(SQLModel):
    min_threshold: Optional[int] = None
    max_threshold: Optional[int] = None
    is_active: Optional[bool] = None
    template_id: Optional[int] = None

class TemplateVersionPublic(TemplateVersionBase):
    version_id: int


class IntervalBase(SQLModel):
    interval_impact: str
    version_id: int

class IntervalCreate(IntervalBase):
    pass

class IntervalUpdate(SQLModel):
    interval_impact: Optional[str] = None
    version_id: Optional[int] = None

class IntervalPublic(IntervalBase):
    interval_id: int


class SurveyBase(SQLModel):
    survey_code: str
    review_date: date
    version: str
    org_id: int
    departments_id: int
    template_id: int

class SurveyCreate(SurveyBase):
    pass

class SurveyUpdate(SQLModel):
    survey_code: Optional[str] = None
    review_date: Optional[date] = None
    version: Optional[str] = None
    org_id: Optional[int] = None
    departments_id: Optional[int] = None
    template_id: Optional[int] = None

class SurveyPublic(SurveyBase):
    survey_id: int
