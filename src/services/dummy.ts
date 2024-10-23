import { User } from "types/users";

// 사용자 본인 더미 데이터
export const dummyUserProfile: User = {
  userId: 1,
  name: "John Doe",
  profileImage: "https://via.placeholder.com/150",
  country: "USA",
  major: "Computer Science",
  interests: [
    { content: "FREE_TALKING", score: 90 },
    { content: "INTERVIEW", score: 80 },
    { content: "ADAPTATION", score: 70 },
    { content: "FRIENDSHIP", score: 60 },
  ],
  feeds: [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      content: "This is a sample feed.",
      numOfLike: 100,
      createdAt: "2024-01-01T12:00:00Z",
    },
  ],
};

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
        { content: category, score: 90 },
        { content: "Music", score: 80 },
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
        { content: category, score: 95 },
        { content: "Travel", score: 85 },
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
        { content: category, score: 90 },
        { content: "Music", score: 80 },
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
        { content: category, score: 95 },
        { content: "Travel", score: 85 },
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
        { content: category, score: 90 },
        { content: "Music", score: 80 },
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
        { content: category, score: 95 },
        { content: "Travel", score: 85 },
      ],
      feeds: [],
    },
  ];
};
