from sqlmodel import SQLModel, Field


class Account(SQLModel, table=True):
    account_id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True)
    password: str
    role: str


class Consultant(SQLModel, table=True):
    consultant_id: int | None = Field(default=None, primary_key=True)
    name: str
    surname: str
    phone: str = Field(unique=True)
    logo: str | None = None
    account_id: int = Field(foreign_key="account.account_id")


class Organization(SQLModel, table=True):
    org_id: int | None = Field(default=None, primary_key=True)
    org_name: str
    phone: str = Field(unique=True)
    logo: str | None = None
    account_id: int = Field(foreign_key="account.account_id")