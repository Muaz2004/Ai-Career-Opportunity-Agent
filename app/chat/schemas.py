from pydantic import BaseModel


class CreateChatResponse(BaseModel):
    id: int
    title: str
    chat_type: str


class RenameChatRequest(BaseModel):
    title: str