// pages/ChatPage.tsx
import { useEffect, useState } from "react";
import { getChatRooms } from "@services/chat";
import useUserStore from "@store/useUserStore";
import ChatRoomComponent from "@components/ChatRoomComponent";
import { ChatRoomType } from "types/chat";

export default function ChatPage() {
  const { userId } = useUserStore();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms(userId);
        setChatRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  const handleRoomSelect = (room: ChatRoomType) => {
    setSelectedRoom(room);
  };

  return (
    <div className="p-4">
      {!selectedRoom ? (
        <div>
          <h2 className="mb-4 text-xl font-bold">채팅방 목록</h2>
          <ul>
            {chatRooms.map((room) => {
              const otherParticipant = room.participants.find(
                (participant) => participant.userId !== userId,
              );
              return (
                <li
                  key={room.id}
                  className="mb-2 cursor-pointer rounded border p-2 hover:bg-gray-100"
                  onClick={() => handleRoomSelect(room)}
                >
                  {otherParticipant
                    ? `${otherParticipant.name}님과의 채팅방`
                    : `채팅방 ${room.id}`}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <ChatRoomComponent
          room={selectedRoom}
          onBack={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
