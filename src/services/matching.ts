import axiosInstance from "@services/axiosInstance";
import { Pageable } from "types/common";
import { User } from "types/users";

// 매칭 회원 탐색
export const get_matches = async (
  purpose: string,
  page: number,
  size: number,
) => {
  const resposne = await axiosInstance.get<{
    content: User[];
    pageable: Pageable;
  }>(`/api/v1/matches?purpose=${purpose}&page=${page}&size=${size}`);

  return resposne.data;
};
