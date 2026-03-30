from fastapi import APIRouter
from app.db.database import SessionDep
from app.services.survey import SurveyService
from app.schemas.surveys import SurveyParamPublic

router = APIRouter(
    prefix="/survey",
    tags=["survey"]
)


@router.get("/{survey_id}")
def get_survey_param(db: SessionDep, survey_id: int) -> SurveyParamPublic:
    service = SurveyService(db)
    return service.get_survey_param_ser(survey_id)
