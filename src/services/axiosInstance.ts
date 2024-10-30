import axios from "axios";
import useUserStore from "@store/useUserStore";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가 (토큰 동적 설정)
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가 (401 에러 처리)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const { setToken, setUser, setUserId } = useUserStore.getState();

      // 상태 초기화
      setToken("");
      setUser({
        userId: 0,
        name: "",
        profileImage: "",
        country: "",
        preferredLanguage: "",
        major: "",
        interests: [],
      });
      setUserId(0);

      // sessionStorage 비우기
      sessionStorage.clear();

      window.location.href = "/login"; // 401 에러 발생 시 로그인 페이지로 이동
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
