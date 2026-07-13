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
from fastapi import Request
from app.auth.google import oauth
from app.auth.service import google_login_user
from fastapi.responses import RedirectResponse

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


@router.get("/google/login")
async def google_login(request: Request):

    redirect_uri = "http://localhost:8000/auth/google/callback"

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )

@router.get("/google/callback")
async def google_callback(
    request: Request,
    db: Session = Depends(get_db)
):

    token = await oauth.google.authorize_access_token(request)

    google_user = token["userinfo"]

    result = google_login_user(
        db,
        google_user
    )

    access_token = result["access_token"]

    return RedirectResponse(
        url=f"http://localhost:5173/google-success?token={access_token}"
    )