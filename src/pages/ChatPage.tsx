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
            uniqueUsers[user.userId] = user;
          });
        }
        setMatchedUsers(Object.values(uniqueUsers));
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
      alert("Please select at least one user.");
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
    <div className="flex flex-grow flex-col items-center justify-center bg-gray-100">
      {!selectedRoom ? (
        <div className="w-4/5 max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-lg">
          <div>
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
              Chat Rooms
            </h2>
            <button
              onClick={toggleGroupChatCreation}
              className="mb-4 w-full rounded-md bg-blue-500 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              {isGroupChatCreation ? "Cancel Group Chat" : "Create Group Chat"}
            </button>
            {isGroupChatCreation ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Select Users
                </h3>
                <ul className="space-y-2">
                  {matchedUsers.map((user) => (
                    <li key={user.userId} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleUserSelection(user.userId)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">{user.name}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleCreateGroupChat}
                  className="w-full rounded-md bg-green-500 py-3 text-sm font-bold text-white transition hover:bg-green-600"
                >
                  Create Group Chat
                </button>
              </div>
            ) : (
              <ul className="space-y-2">
                {chatRooms.map((room) => {
                  const participantNames = room.participants
                    .filter((participant) => participant.userId !== userId)
                    .map((participant) => participant.name)
                    .join(", ");

                  return (
                    <li
                      key={room.id}
                      className="cursor-pointer rounded border p-3 text-gray-700 hover:bg-gray-100"
                      onClick={() => handleRoomSelect(room)}
                    >
                      {participantNames || `Chat Room ${room.id}`}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <ChatRoomComponent room={selectedRoom} onBack={handleBack} />
      )}
    </div>
  );
}
