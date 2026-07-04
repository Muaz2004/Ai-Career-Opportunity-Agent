from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.auth.dependencies import get_current_user
from app.auth.models import User

from app.chat.service import (
    create_chat,
    get_user_chats,
    get_chat,
    get_messages,
    rename_chat,
    delete_chat,
)

from app.chat.schemas import RenameChatRequest

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/new")
def new_chat(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = create_chat(
        db=db,
        user_id=current_user.id
    )

    return {
        "session_id": chat.id,
        "title": chat.title,
        "chat_type": chat.chat_type
    }


@router.get("/")
def list_chats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chats = get_user_chats(
        db=db,
        user_id=current_user.id
    )

    return chats


@router.get("/{chat_id}")
def chat_detail(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = get_chat(
        db=db,
        chat_id=chat_id,
        user_id=current_user.id
    )

    if chat is None:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    messages = get_messages(
        db=db,
        session_id=chat.id
    )

    return {
        "chat": chat,
        "messages": messages
    }


@router.patch("/{chat_id}")
def update_chat(
    chat_id: int,
    body: RenameChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = get_chat(
        db=db,
        chat_id=chat_id,
        user_id=current_user.id
    )

    if chat is None:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    rename_chat(
        db=db,
        chat=chat,
        new_title=body.title
    )

    return {
        "message": "Chat renamed successfully"
    }


@router.delete("/{chat_id}")
def remove_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = get_chat(
        db=db,
        chat_id=chat_id,
        user_id=current_user.id
    )

    if chat is None:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )

    delete_chat(
        db=db,
        chat=chat
    )

    return {
        "message": "Chat deleted successfully"
    }