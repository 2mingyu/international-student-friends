import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getChatRooms, createChatRoom } from "@services/chat";
import { get_matches } from "@services/matching";
import useUserStore from "@store/useUserStore";
import ChatRoomComponent from "@components/ChatRoomComponent";
import { ChatRoomType } from "types/chat";
import { User } from "types/users";

export default function ChatPage() {
  const { userId, user } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoomType | null>(null);
  const [isGroupChatCreation, setIsGroupChatCreation] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRooms(userId);
        setChatRooms(rooms);

        const queryParams = new URLSearchParams(location.search);
        const roomId = queryParams.get("roomId");

        if (roomId) {
          const initialRoom = rooms.find((room) => room.id === Number(roomId));
          if (initialRoom) {
            setSelectedRoom(initialRoom);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    const fetchMatchedUsers = async () => {
      const uniqueUsers: { [key: number]: User } = {};
      try {
        for (const interest of user.interests) {
          const data = await get_matches(interest.content, 0, 10);
          data.content.forEach((user) => {
            uniqueUsers[user.userId] = user; // 중복된 유저는 덮어쓰도록
          });
        }
        setMatchedUsers(Object.values(uniqueUsers)); // 중복 제거된 유저만 배열로 변환하여 설정
      } catch (error) {
        console.error("Failed to fetch matched users:", error);
      }
    };

    fetchChatRooms();
    fetchMatchedUsers();
  }, [userId, location.search, user.interests]);

  const handleRoomSelect = (room: ChatRoomType) => {
    setSelectedRoom(room);
    navigate(`/chat?roomId=${room.id}`);
  };

  const handleBack = () => {
    setSelectedRoom(null);
    navigate("/chat");
  };

  const toggleGroupChatCreation = () => {
    setIsGroupChatCreation(!isGroupChatCreation);
    setSelectedUsers([]);
  };

  const handleUserSelection = (userId: number) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId],
    );
  };

  const handleCreateGroupChat = async () => {
    if (selectedUsers.length === 0) {
      alert("유저를 선택해주세요.");
      return;
    }
    try {
      const newRoom = await createChatRoom(selectedUsers);
      navigate(`/chat?roomId=${newRoom.id}`);
      setIsGroupChatCreation(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Failed to create group chat room:", error);
    }
  };

  return (
    <div className="p-4">
      {!selectedRoom ? (
        <div>
          <h2 className="mb-4 text-xl font-bold">ChatRooms</h2>
          <button
            onClick={toggleGroupChatCreation}
            className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            {isGroupChatCreation ? "Cancel" : "Create a group chat room"}
          </button>
          {isGroupChatCreation && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Select Users</h3>
              <ul>
                {matchedUsers.map((user) => (
                  <li key={user.userId} className="mb-2 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleUserSelection(user.userId)}
                      className="mr-2"
                    />
                    <span>{user.name}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCreateGroupChat}
                className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
              >
                Create
              </button>
            </div>
          )}
          <ul>
            {chatRooms.map((room) => {
              const participantNames = room.participants
                .filter((participant) => participant.userId !== userId)
                .map((participant) => participant.name)
                .join(", ");

              return (
                <li
                  key={room.id}
                  className="mb-2 cursor-pointer rounded border p-2 hover:bg-gray-100"
                  onClick={() => handleRoomSelect(room)}
                >
                  {participantNames || `채팅방 ${room.id}`}
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
