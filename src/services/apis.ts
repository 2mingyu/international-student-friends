import { createDummyMatchedUsers, dummyUserProfile } from "./dummy";
import axiosInstance from "@services/axiosInstance";
import { Pageable } from "types/common";
import { User } from "types/users";

// 매칭 회원 탐색
export const get_matches = async (
  purpose: string,
  page: number,
  size: number,
) => {
  // 여기부터 더미
  const dummyUsers: User[] = createDummyMatchedUsers(purpose);
  const dummyPageable: Pageable = {
    page: page,
    size: size,
    totalElements: 2,
    totalPages: 1,
  };

  return {
    content: dummyUsers,
    pageable: dummyPageable,
  };
  // 여기까지 더미
  const resposne = await axiosInstance.get<{
    content: User[];
    pageable: Pageable;
  }>(`/api/v1/matches?purpose=${purpose}&page=${page}&size=${size}`);

  return resposne.data;
};

// 프로필 조회
export const get_users_profile = async (userId: number) => {
  // 여기부터 더미
  return dummyUserProfile;
  // 여기까지 더미
  const response = await axiosInstance.get<User>(
    `/api/v1/users/${userId}/profile`,
  );

  return response.data;
};
