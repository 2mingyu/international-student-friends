import { User } from "types/users";

export interface ChatRoomType {
  id: number;
  participants: User[];
}

export interface ChatMessage {
  id: number;
  senderId: number;
  content: string;
  type: string;
  translations?: Translation[];
}

export interface Translation {
  language: string;
  content: string;
}
