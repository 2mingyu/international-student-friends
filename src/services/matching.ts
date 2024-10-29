import { createDummyMatchedUsers } from "./dummy";
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
