from app.database import engine
from app.database import Base

from app.auth.models import User

Base.metadata.create_all(bind=engine)

print("Database tables created successfully.")    