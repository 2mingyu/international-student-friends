// services/chat.ts
import axiosInstance from "@services/axiosInstance";
import { ChatRoomType, ChatMessage } from "types/chat";

// 채팅방 목록 가져오기
export const getChatRooms = async (userId: number) => {
  const response = await axiosInstance.get<{ chatRooms: ChatRoomType[] }>(
    `/api/v1/chat-rooms/users/${userId}`,
  );
  return response.data.chatRooms;
};

// 특정 채팅방의 메시지 가져오기
export const getChatMessages = async (
  roomId: number,
  page: number,
  size: number,
) => {
  const response = await axiosInstance.get<{ messages: ChatMessage[] }>(
    `/api/v1/chat-rooms/${roomId}/messages?page=${page}&size=${size}`,
  );
  return response.data.messages;
};

// 채팅방 생성하기
export const createChatRoom = async (participantIds: number[]) => {
  const response = await axiosInstance.post<ChatRoomType>(
    `/api/v1/chat-rooms/groups`,
    {
      participantIds: participantIds,
    },
  );
  return response.data;
};
