import api from "../utils/api";

// Create new chat session
export const createChat = async () => {
  const res = await api.post("/chat/new");
  return res.data;
};

// Get all chats for sidebar
export const getChats = async () => {
  const res = await api.get("/chat");
  return res.data;
};

// Get messages for one chat
export const getMessages = async (chatId) => {
  const res = await api.get(`/chat/${chatId}`);
  return res.data;
};


export const sendMessage = async (sessionId, query) => {
  const res = await api.post("/ask", {
    session_id: sessionId,
    query: query,
  });

  return res.data;
};