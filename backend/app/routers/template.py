from fastapi import APIRouter
from app.db.database import SessionDep
from app.services.template import Template
from app.schemas.surveys import TemplateParametersPublic, TemplateVersionWithIntervalsPublic, SurveyCreateWithTemplate, SurveyPublic
router = APIRouter(
    prefix="/template",
    tags = ["template"]
)


@router.get("/")
async def view_template_names(db: SessionDep) -> list[TemplateParametersPublic]:
    service = Template(db)

    return service.get_template_names_ser()


@router.get("/parameters/{temp_id}")
async def view_parameters_intervals(db:SessionDep, temp_id: int) -> TemplateVersionWithIntervalsPublic:

    service = Template(db)
    
    return service.get_parameters_intervals_ser(temp_id )


@router.post("/create_survey")
async def create_survey(db: SessionDep, data: SurveyCreateWithTemplate) -> SurveyPublic:
    service = Template(db)
    return service.create_survey_set(data)