import { useState } from "react";
import { login } from "@services/auth";
import useUserStore from "@store/useUserStore";
import { useNavigate } from "react-router-dom";
import { get_users } from "@services/user";
import { User } from "types/users";
import usersData from "@data/users.json"; // 빠른 로그인용 데이터
import { LoginResponse } from "types/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUserId, setUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 폼이 비어있으면 alert 발생
    if (!email || !password) {
      return alert("Please fill in both email and password.");
    }
    try {
      const response: LoginResponse = await login(email, password);
      setToken(response.token);
      setUserId(response.userId);
      const userProfile: User = await get_users(response.userId);
      setUser(userProfile);

      // sessionStorage에 토큰과 유저 정보 저장
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("userId", String(response.userId));
      sessionStorage.setItem("user", JSON.stringify(userProfile));

      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const quickLogin = async (quickEmail: string, quickPassword: string) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-200 p-3 text-sm focus:border-gray-500 focus:bg-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-200 p-3 text-sm focus:border-gray-500 focus:bg-white focus:outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full rounded-md bg-gray-700 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          Log In
        </button>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-gray-300"></div>
          <span className="relative z-10 bg-white px-4 text-sm text-gray-500">
            OR
          </span>
        </div>

        <button
          onClick={() => console.log("Navigate to register page")}
          className="w-full rounded-md bg-gray-500 py-3 text-sm font-bold text-white transition hover:bg-gray-600"
        >
          Register
        </button>

        <h3 className="text-center text-sm font-semibold text-gray-700">
          Quick Login
        </h3>
        <div className="space-y-2">
          {usersData.map((user, index) => (
            <button
              key={index}
              onClick={() => quickLogin(user.email, user.password)}
              className="w-full rounded-md bg-gray-300 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-400"
            >
              {user.email}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
