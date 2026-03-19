
from fastapi import APIRouter, File, UploadFile, Form
from app.db.database import SessionDep
from app.schemas.accounts import OrganizationCreate, OrganizationPublic
from app.services.organization import OrganizationSer
from app.schemas.organizations import DepartmentCreate, DepartmentPublic
from app.services.department import DepartmentSer
import shutil, uuid

router = APIRouter(
    prefix="/organizations",
    tags = ["organizations"]
)


@router.post("/")
async def add_organization(
    db: SessionDep,
    org_name: str = Form(...),
    phone: str = Form(...),
    logo: UploadFile = File(None)
) -> OrganizationPublic:
    logo_path = None
    if logo and logo.filename:
        ext = logo.filename.rsplit(".", 1)[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        logo_path = f"static/logos/{filename}"
        with open(logo_path, "wb") as f:
            shutil.copyfileobj(logo.file, f)

    data = OrganizationCreate(org_name=org_name, phone=phone, logo=logo_path)
    service = OrganizationSer(db)
    return service.create_organization_ser(data)


@router.post("/{org_id}/department")
def add_department(db: SessionDep, data: DepartmentCreate, org_id: int) -> DepartmentPublic:
    service = DepartmentSer(db)

    return service.create_department_ser(data, org_id)

@router.get("/")

def view_organizations(db: SessionDep) -> list[OrganizationPublic]:

    service  = OrganizationSer(db)
    return service.read_organization_ser()


@router.get("/{org_id}/department")
def view_departments(db: SessionDep, org_id: int) -> list[DepartmentPublic]:
    service  = DepartmentSer(db)
    return service.read_department(org_id)