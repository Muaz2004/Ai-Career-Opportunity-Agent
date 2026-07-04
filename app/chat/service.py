from sqlalchemy.orm import Session

from app.chat.models import ChatSession
from app.chat.models import Message


def create_chat(
    db: Session,
    user_id: int,
    chat_type: str = "ask",
    title: str = "New Chat"
):

    chat = ChatSession(
        user_id=user_id,
        title=title,
        chat_type=chat_type
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_chat(
    db: Session,
    chat_id: int,
    user_id: int
):

    return (
        db.query(ChatSession)
        .filter(
            ChatSession.id == chat_id,
            ChatSession.user_id == user_id
        )
        .first()
    )


def get_user_chats(
    db: Session,
    user_id: int
):

    return (
        db.query(ChatSession)
        .filter(ChatSession.user_id == user_id)
        .order_by(ChatSession.updated_at.desc())
        .all()
    )

def save_message(
    db: Session,
    session_id: int,
    role: str,
    content: str
):

    message = Message(
        session_id=session_id,
        role=role,
        content=content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    # AUTO CHAT TITLE LOGIC (ADD THIS)
    chat = db.query(ChatSession).filter(ChatSession.id == session_id).first()

    if chat and (chat.title == "New Chat" or chat.title is None):
        chat.title = generate_title(content)
        db.commit()
        db.refresh(chat)

    return message


def get_messages(
    db: Session,
    session_id: int
):

    return (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )


def rename_chat(
    db: Session,
    chat: ChatSession,
    new_title: str
):

    chat.title = new_title

    db.commit()
    db.refresh(chat)

    return chat


def delete_chat(
    db: Session,
    chat: ChatSession
):

    db.delete(chat)
    db.commit()


def generate_title(message: str):
    return message[:30] + "..." if len(message) > 30 else message