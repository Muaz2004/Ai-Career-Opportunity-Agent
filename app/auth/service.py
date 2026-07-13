from sqlalchemy.orm import Session

from app.auth.models import User

from app.auth.password import hash_password
from app.auth.password import verify_password

from app.auth.jwt import create_access_token


def create_user(db: Session, user):

    existing = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing:

        raise Exception(
            "Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(
            user.password
        )
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


def login_user(db: Session, user):

    existing = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not existing:

        raise Exception(
            "Invalid credentials"
        )

    if not verify_password(
        user.password,
        existing.password
    ):

        raise Exception(
            "Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": str(existing.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": existing
    }




def google_login_user(db: Session, google_user):

    email = google_user["email"]
    name = google_user.get(
        "name",
        "Google User"
    )

    # Check existing user
    existing = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # Existing account
    if existing:

        token = create_access_token(
            {
                "sub": str(existing.id)
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": existing
        }


    # New Google account
    new_user = User(
        full_name=name,
        email=email,
        password=None,
        provider="google"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    token = create_access_token(
        {
            "sub": str(new_user.id)
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": new_user
    }