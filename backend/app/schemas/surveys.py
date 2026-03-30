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
    template_id: Optional[int] = None

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
    interval_number: int
    interval_impact: Optional[str] = None
    version_id: int

class IntervalCreate(IntervalBase):
    pass

class IntervalUpdate(SQLModel):
    interval_number: Optional[int] = None
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
    template_id: Optional[int] = None
    version_id: Optional[int] = None

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


class IntervalNestedPublic(SQLModel):
    interval_id: int
    interval_number: int

class TemplateVersionWithIntervalsPublic(SQLModel):
    version_id: int
    min_threshold: int
    max_threshold: int
    is_active: Optional[bool] = None
    intervals: list[IntervalNestedPublic] = []

class SurveyCreateWithTemplate(SQLModel):
    survey_code: str
    review_date: date
    version: str
    org_id: int
    departments_id: int
    template_id: Optional[int] = None
    name: Optional[str] = None
    min_threshold: Optional[int] = None
    max_threshold: Optional[int] = None
    intervals: list[int] = []
    version_id: Optional[int] = None

class SurveyParamPublic(SQLModel):
    survey_id: int
    max_threshold: int
    min_threshold: int
    intervals: list[IntervalNestedPublic] = []