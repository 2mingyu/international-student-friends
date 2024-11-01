import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getChatRooms } from "@services/chat";
import useUserStore from "@store/useUserStore";
import ChatRoomComponent from "@components/ChatRoomComponent";
import { ChatRoomType } from "types/chat";

export default function ChatPage() {
  const { userId } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms(userId);
        setChatRooms(rooms);

        // 쿼리에서 roomId 가져오기
        const queryParams = new URLSearchParams(location.search);
        const roomId = queryParams.get("roomId");

        if (roomId) {
          // 쿼리로 받은 roomId에 해당하는 채팅방 선택
          const initialRoom = rooms.find((room) => room.id === Number(roomId));
          if (initialRoom) {
            setSelectedRoom(initialRoom);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId, location.search]);

  const handleRoomSelect = (room: ChatRoomType) => {
    setSelectedRoom(room);
    navigate(`/chat?roomId=${room.id}`);
  };

  const handleBack = () => {
    setSelectedRoom(null);
    navigate("/chat"); // 쿼리에서 roomId를 제거하고 기본 채팅 페이지로 이동
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
        <ChatRoomComponent room={selectedRoom} onBack={handleBack} />
      )}
    </div>
  );
}
