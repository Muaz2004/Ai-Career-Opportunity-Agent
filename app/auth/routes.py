from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.schemas import UserCreate
from app.auth.schemas import UserLogin

from app.auth.service import create_user
from app.auth.service import login_user

from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/signup")
def signup(

    user: UserCreate,

    db: Session = Depends(
        get_db
    )

):

    try:

        new_user = create_user(
            db,
            user
        )

        return {
            "message": "User created successfully",
            "user": new_user
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/login")
def login(

    user: UserLogin,

    db: Session = Depends(
        get_db
    )

):

    try:

        return login_user(
            db,
            user
        )

    except Exception as e:

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )


@router.get("/me")
def me(

    current_user=Depends(
        get_current_user
    )

):

    return current_user