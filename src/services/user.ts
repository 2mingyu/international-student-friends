import axiosInstance from "@services/axiosInstance";
import { User } from "types/users";

// 사용자 정보 조회
export const get_users = async (id: number) => {
  const response = await axiosInstance.get<User>(`/api/v1/users/${id}`);
  return response.data;
};

// 사용자 정보 수정
export const put_users = async (
  id: number,
  name: string,
  country: string,
  profileImage: string,
  preferredLanguage: string,
  major: string,
) => {
  const response = await axiosInstance.put(`/api/v1/users/${id}`, {
    name: name,
    country: country,
    profileImage: profileImage,
    preferredLanguage: preferredLanguage,
    major: major,
  });
  return response.data;
};

// 관심사 등록
export const put_interests = async (id: number, newInterests: string[]) => {
  const interestsPayload = newInterests.map((interest) => ({
    interest: interest,
    score: 0, // TODO X: score는 0으로 고정
  }));

  const response = await axiosInstance.put(`/api/v1/users/${id}/interests`, {
    interests: interestsPayload,
  });
  return response.data;
};
