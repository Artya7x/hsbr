from sqlmodel import Session
from app.crud.surveys import get_survey_param
from fastapi import HTTPException


class SurveyService:

    def __init__(self, db: Session):
        self.db = db

    def get_survey_param_ser(self, survey_id: int):
        result = get_survey_param(self.db, survey_id)

        if not result:
            raise HTTPException(status_code=404, detail="Survey not found")

        survey, intervals, parameters = result

        return {
            "survey_id": survey.survey_id,
            "min_threshold": parameters.min_threshold if parameters else None,
            "max_threshold": parameters.max_threshold if parameters else None,
            "intervals": [{"interval_id": i.interval_id, "interval_number": i.interval_number} for i in intervals],
        }
