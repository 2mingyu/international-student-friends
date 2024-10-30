import { useEffect, useState } from "react";
import { get_matches } from "@services/matching";
import { User } from "types/users";
import { interests } from "@data/datas";

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
  if (language === "English")
    interestTitle = interests[interest]?.en || interest;
  else if (language === "French")
    interestTitle = interests[interest]?.fr || interest;
  else if (language === "Japanese")
    interestTitle = interests[interest]?.ja || interest;
  else if (language === "German")
    interestTitle = interests[interest]?.de || interest;
  else if (language === "Chinese")
    interestTitle = interests[interest]?.zh || interest;

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
              className="mb-2 min-w-max snap-start rounded-lg border-2 border-slate-100 p-4"
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
