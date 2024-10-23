export interface User {
  userId: number;
  name: string;
  profileImage: string;
  country: string;
  major: string;
  interests: Interest[];
  feeds?: Feed[];
}

export interface Interest {
  content: string;
  score: number;
}

export interface Feed {
  id: number;
  image: string;
  content: string;
  numOfLike: number;
  createdAt: string; // TODO: datetime 확인
}
