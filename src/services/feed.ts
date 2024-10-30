import axiosInstance from "@services/axiosInstance";

// 피드 삭제
export const delete_feeds = async (feedId: number) => {
  const response = await axiosInstance.delete(`/api/v1/feeds/${feedId}`);
  return response.data;
};

// 피드 조회
export const get_feeds = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/api/v1/feeds?page=${page}&size=${size}`,
  );
  return response.data;
};

// 피드 업로드
export const post_feeds = async (
  content: string,
  userId: number,
  image: FormData,
) => {
  const response = await axiosInstance.post(
    `/api/v1/feeds?content=${content}&userId=${userId}`,
    image,
  );
  return response.data;
};

// 좋아요 토글
export const post_feeds_like = async (feedId: number, userId: number) => {
  const response = await axiosInstance.post(
    `/api/v1/feeds/${feedId}/likes?userId=${userId}`,
  );
  return response.data;
};
