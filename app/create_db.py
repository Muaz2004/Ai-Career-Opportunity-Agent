from app.database import engine
from app.database import Base

from app.auth.models import User


from app.chat.models import ChatSession
from app.chat.models import Message

Base.metadata.create_all(bind=engine)

print("Database tables created successfully.")    