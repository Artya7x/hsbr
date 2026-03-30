
from sqlmodel import Session

from app.schemas.surveys import TemplateParametersCreate, TemplateVersionCreate, TemplateVersionPublic, SurveyCreateWithTemplate
from sqlmodel import Session, select
from app.models.surveys import TemplateParameters, TemplateVersion
from app.crud.surveys import get_template_names, get_parameters_intervals, create_survey, create_template_parameters, create_template_version, create_intervals

from fastapi import HTTPException
class Template:
    
    def __init__(self,db: Session):
        self.db = db

    def get_template_names_ser(self):
        
        result =  get_template_names(self.db)

        return result
    
    def get_parameters_intervals_ser(self, temp_id):

        result = get_parameters_intervals(self.db, temp_id)

        if not result:
            raise HTTPException(status_code= 404, detail = "Template Not Found")
        
        version = result[0][0]
        intervals = []
        for (ver, interval) in result:
            intervals.append(interval)


        intervals_dump  = []

        for inter in intervals:
            
            intervals_dump.append(inter.model_dump())

        return {
            **version.model_dump(),
            "intervals": intervals_dump
        }
    
    def create_survey_set(self, data: SurveyCreateWithTemplate):
        try:
            #Case 1 : If user selected an existing template
            if data.template_id:
                survey = create_survey(self.db, data)

            #Case 2 and 3: Create survey ( with or without the template)
            else:
                if data.name:
                    template = create_template_parameters(self.db, data)
                    template_id = template.template_id
                else:
                    template_id = None

                version = create_template_version(self.db, data.model_copy(update={"template_id": template_id, "is_active": True}))

                create_intervals(self.db, data.intervals, version.version_id)
                
                survey = create_survey(self.db, data.model_copy(update={"template_id": template_id, "version_id": version.version_id}))

            return survey
        
        except Exception:
            self.db.rollback()
            raise