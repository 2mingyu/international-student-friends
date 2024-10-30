import { useEffect, useState } from "react";
import useUserStore from "@store/useUserStore";
import { getChatRooms, getChatRoomMessages } from "@services/chat";
import SockJS from "sockjs-client";
import { over as StompOver } from "stompjs";

export default function ChatPage() {
  const { user } = useUserStore();
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");

  // 채팅방 로드
  useEffect(() => {
    async function fetchRooms() {
      if (user.userId) {
        try {
          const chatRooms = await getChatRooms(user.userId);
          setRooms(chatRooms);
        } catch (error) {
          console.error("Failed to load chat rooms", error);
        }
      }
    }
    fetchRooms();
  }, [user.userId]);

  // 채팅방 입장
  const enterRoom = async (roomId: number) => {
    setCurrentRoomId(roomId);
    const roomMessages = await getChatRoomMessages(roomId);
    setMessages(roomMessages);
    connectToWebSocket(roomId); // 웹소켓 연결
  };

  // 웹소켓 연결
  const connectToWebSocket = (roomId: number) => {
    const socket = new SockJS("/ws/chat");
    const stompClient = StompOver(socket);
    setStompClient(stompClient);

    stompClient.connect({}, (frame: any) => {
      console.log("Connected: " + frame);
      stompClient.subscribe(`/sub/chat/room/${roomId}`, (message: any) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });
  };

  // 메시지 전송
  const sendMessage = () => {
    if (stompClient && newMessage.trim() && currentRoomId) {
      const chatMessage = {
        chatRoomId: currentRoomId,
        content: newMessage,
        senderId: user.userId,
        type: "TEXT",
      };
      stompClient.send("/pub/chat/message", {}, JSON.stringify(chatMessage));
      setNewMessage(""); // 메시지 전송 후 입력창 비우기
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r p-4">
        <h2 className="mb-4 text-xl">채팅방 목록</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id} className="mb-2">
              <button
                className="w-full rounded border p-2"
                onClick={() => enterRoom(room.id)}
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 p-4">
        <h2 className="mb-4 text-xl">채팅방</h2>
        <div className="chat-messages h-96 overflow-y-auto border p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.senderId === user.userId ? "sent" : "received"
              }`}
            >
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <div className="message-form mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input w-full border p-2"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 p-2 text-white"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
