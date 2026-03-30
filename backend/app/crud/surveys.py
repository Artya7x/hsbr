from app.schemas.surveys import SurveyCreateWithTemplate, TemplateParametersCreate, TemplateVersionCreate, SurveyCreate
from sqlmodel import Session, select
from app.models.surveys import TemplateParameters, TemplateVersion, Interval, Survey
from sqlmodel import select


def get_template_names(db:Session):
    sql = select(TemplateParameters)

    return db.exec(sql).all()


def get_parameters_intervals(db: Session, temp_id: int):
    version = db.exec(select(TemplateVersion, Interval)
                    .join(Interval, Interval.version_id == TemplateVersion.version_id)
                    .where(TemplateVersion.template_id == temp_id)
                    .where(TemplateVersion.is_active == True)).all()
    return version


def create_template_parameters(db: Session, data: TemplateParametersCreate):
    template = TemplateParameters.model_validate(data)
    db.add(template)
    db.flush()
    return template


def create_template_version(db: Session, data: TemplateVersionCreate):
    version = TemplateVersion.model_validate(data)
    db.add(version)
    db.flush()
    return version


def create_intervals(db: Session, intervals: list[int], version_id: int):
    for number in intervals:
        db.add(Interval(interval_number=number, version_id=version_id))
    db.flush()


def create_survey(db: Session, data: SurveyCreate):
    survey = Survey.model_validate(data)
    db.add(survey)
    db.commit()
    db.refresh(survey)
    return survey

def get_survey_param(db: Session, survey_id: int):
    survey = db.exec(select(Survey).where(Survey.survey_id == survey_id)).first()

    if not survey:
        return None

    intervals = []
    parameters = None

    if survey.version_id:
        intervals = db.exec(select(Interval).where(Interval.version_id == survey.version_id)).all()
        parameters = db.exec(select(TemplateVersion).where(TemplateVersion.version_id == survey.version_id)).first()

    return survey, intervals, parameters
