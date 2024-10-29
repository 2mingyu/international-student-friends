import { User } from "types/users";

// 더미 매치 유저 생성 함수
export const createDummyMatchedUsers = (category: string): User[] => {
  return [
    {
      userId: 2,
      name: `John Doe`,
      profileImage: "https://via.placeholder.com/150",
      country: "USA",
      major: "Computer Science",
      interests: [
        { id: 1, content: category, score: 90 },
        { id: 2, content: "Music", score: 80 },
      ],
      feeds: [],
    },
    {
      userId: 3,
      name: `Jane Smith`,
      profileImage: "https://via.placeholder.com/150",
      country: "Canada",
      major: "Mathematics",
      interests: [
        { id: 3, content: category, score: 95 },
        { id: 4, content: "Travel", score: 85 },
      ],
      feeds: [],
    },
    {
      userId: 4,
      name: `Long Long Name HaHa`,
      profileImage: "https://via.placeholder.com/150",
      country: "USA",
      major: "Computer Science",
      interests: [
        { id: 5, content: category, score: 90 },
        { id: 6, content: "Music", score: 80 },
      ],
      feeds: [],
    },
    {
      userId: 5,
      name: `Jane Smith`,
      profileImage: "https://via.placeholder.com/150",
      country: "Canada",
      major: "Mathematics",
      interests: [
        { id: 7, content: category, score: 95 },
        { id: 8, content: "Travel", score: 85 },
      ],
      feeds: [],
    },
    {
      userId: 6,
      name: `John Doe`,
      profileImage: "https://via.placeholder.com/150",
      country: "USA",
      major: "Computer Science",
      interests: [
        { id: 9, content: category, score: 90 },
        { id: 10, content: "Music", score: 80 },
      ],
      feeds: [],
    },
    {
      userId: 7,
      name: `Jane Smith`,
      profileImage: "https://via.placeholder.com/150",
      country: "Canada",
      major: "Mathematics",
      interests: [
        { id: 11, content: category, score: 95 },
        { id: 12, content: "Travel", score: 85 },
      ],
      feeds: [],
    },
  ];
};
