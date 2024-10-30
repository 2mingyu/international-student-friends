import axiosInstance from "@services/axiosInstance";

// 채팅방 목록 가져오기
export const getChatRooms = async (userId: number) => {
  const response = await axiosInstance.get(
    `/api/v1/chat-rooms/users/${userId}`,
  );
  return response.data.chatRooms;
};

// 특정 채팅방 메시지 가져오기
export const getChatRoomMessages = async (roomId: number) => {
  const response = await axiosInstance.get(
    `/api/v1/chat-rooms/${roomId}/messages?size=30`,
  );
  return response.data.messages;
};
