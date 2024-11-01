import { useEffect, useState, useRef } from "react";
import { ChatRoomType, ChatMessage } from "types/chat";
import { getChatMessages } from "@services/chat";
import useUserStore from "@store/useUserStore";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import axiosInstance from "@services/axiosInstance";
import { filteredMessages } from "@data/datas";

interface ChatRoomProps {
  room: ChatRoomType;
  onBack: () => void;
}

export default function ChatRoomComponent({ room, onBack }: ChatRoomProps) {
  const { userId, token, user } = useUserStore();
  const userLanguage = user.preferredLanguage;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const stompClientRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const msgs = await getChatMessages(room.id, 0, 50);
        setMessages(msgs.reverse());
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
    connectWebSocket();

    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
      stompClientRef.current = null;
    };
  }, [room.id]);

  const connectWebSocket = () => {
    if (stompClientRef.current && stompClientRef.current.connected) return;

    const socket = new SockJS(`${axiosInstance.defaults.baseURL}/ws/chat`);
    const stompClient = over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log("Connected to WebSocket");

        stompClient.subscribe(`/sub/chat/room/${room.id}`, (message) => {
          const received = JSON.parse(message.body);

          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (msg) => msg.id === received.payload.id,
            );
            if (isDuplicate) return prevMessages;
            return [...prevMessages, received.payload];
          });

          scrollToBottom();
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      },
    );
  };

  const sendMessage = () => {
    if (!stompClientRef.current || !newMessage.trim()) return;

    const chatMessage = {
      chatRoomId: room.id,
      content: newMessage.trim(),
      type: "TEXT",
    };

    stompClientRef.current.send(
      "/pub/chat/message",
      { Authorization: `Bearer ${token}` },
      JSON.stringify(chatMessage),
    );

    setNewMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex w-full flex-grow flex-col bg-white p-4 shadow-lg">
      <button
        onClick={onBack}
        className="mb-4 w-14 text-blue-500 hover:underline"
      >
        &larr; Back
      </button>
      <div className="flex-grow overflow-y-auto py-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === userId;
          const translation =
            message.translations?.find((t) => t.language === userLanguage) ||
            message.translations?.find((t) => t.language);
          const isFiltered = filteredMessages.has(
            translation ? translation.content : message.content,
          );

          return (
            <div
              key={message.id}
              className={`mb-3 flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 text-sm ${
                  isFiltered
                    ? "bg-red-200 text-red-700"
                    : isOwnMessage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                }`}
              >
                {!isOwnMessage && (
                  <p className="mb-1 text-xs font-semibold text-gray-600">
                    {message.senderName}
                  </p>
                )}
                {isOwnMessage ? (
                  <p>{message.content}</p>
                ) : translation ? (
                  <>
                    <p>{translation.content}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      (Original: {message.content})
                    </p>
                  </>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center space-x-2">
        <input
          className="flex-grow rounded-md border border-gray-300 bg-gray-100 p-3 text-sm focus:border-gray-500 focus:bg-white focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
