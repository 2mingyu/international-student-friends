// components/InterestMatches.tsx
import { useEffect, useState } from "react";
import { get_matches } from "@services/matching";
import { getChatRooms, createChatRoom } from "@services/chat";
import { User } from "types/users";
import { interests } from "@data/datas";
import { useNavigate } from "react-router-dom";
import { ChatRoomType } from "types/chat";
import useUserStore from "@store/useUserStore";

interface InterestMatchesProps {
  interest: string;
  language: string;
  isFirst: boolean;
}

export default function InterestMatches({
  interest,
  isFirst,
  language,
}: InterestMatchesProps) {
  const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await get_matches(interest, 0, 10);
        setMatchedUsers(data.content);
        setError(null);
      } catch (error) {
        console.error(`Failed to fetch matches for ${interest}`, error);
        setError(`Failed to fetch matches for ${interest}`);
        setMatchedUsers([]);
      }
    };

    fetchMatches();
  }, [interest]);

  let interestTitle = interests[interest]?.ko || interest;
  if (language === "en") interestTitle = interests[interest]?.en || interest;
  else if (language === "fr")
    interestTitle = interests[interest]?.fr || interest;
  else if (language === "ja")
    interestTitle = interests[interest]?.ja || interest;
  else if (language === "de")
    interestTitle = interests[interest]?.de || interest;
  else if (language === "zh")
    interestTitle = interests[interest]?.zh || interest;

  // 유저 클릭 시 채팅방 생성 또는 기존 채팅방 입장
  const handleUserClick = async (matchedUserId: number) => {
    try {
      // 기존 채팅방 가져오기
      const existingRooms = await getChatRooms(userId);
      const existingRoom = existingRooms.find(
        (room) =>
          room.participants.length === 2 && // 참여자가 정확히 2명인지 확인
          room.participants.some(
            (participant) => participant.userId === userId,
          ) &&
          room.participants.some(
            (participant) => participant.userId === matchedUserId,
          ),
      );

      if (existingRoom) {
        // 기존 1:1 채팅방이 있으면 해당 채팅방으로 이동
        navigate(`/chat?roomId=${existingRoom.id}`);
      } else {
        // 기존 채팅방이 없으면 새로 생성하고 이동
        const newRoom: ChatRoomType = await createChatRoom([matchedUserId]);
        navigate(`/chat?roomId=${newRoom.id}`);
      }
    } catch (error) {
      console.error("Failed to create or fetch chat room:", error);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="mb-4 text-xl font-bold">{interestTitle}</h2>
      {error ? (
        <p>{error}</p>
      ) : matchedUsers.length > 0 ? (
        <div className="flex snap-x snap-mandatory space-x-4 overflow-x-auto">
          {matchedUsers.map((matchedUser) => (
            <div
              key={matchedUser.userId}
              className="mb-2 min-w-max cursor-pointer snap-start rounded-lg border-2 border-slate-100 p-4"
              onClick={() => handleUserClick(matchedUser.userId)}
            >
              <div className="flex gap-4">
                <img
                  src={matchedUser.profileImage}
                  alt={matchedUser.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{matchedUser.name}</h3>
                  <p className="text-sm text-gray-600">{matchedUser.country}</p>
                  <p className="text-sm text-gray-600">{matchedUser.major}</p>
                </div>
              </div>
              {/* 첫 번째 InterestMatches에만 interests 표시 */}
              {isFirst && (
                <div className="mt-2">
                  <ul className="text-sm text-gray-600">
                    {matchedUser.interests.map((interest) => (
                      <li key={interest.id}>{interest.content}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No matches found for {interest}.</p>
      )}
    </div>
  );
}
