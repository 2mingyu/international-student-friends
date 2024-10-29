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
    try {
      const response: LoginResponse = await login(email, password);
      setToken(response.token);
      setUserId(response.userId);
      const userProfile: User = await get_users(response.userId);
      setUser(userProfile);
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
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 rounded border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 rounded border p-2"
      />
      <button
        onClick={handleLogin}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Login
      </button>

      <h3 className="mb-2 text-lg font-semibold">Quick Login</h3>
      <div className="space-y-2">
        {usersData.map((user, index) => (
          <button
            key={index}
            onClick={() => quickLogin(user.email, user.password)}
            className="w-full rounded bg-gray-500 px-4 py-2 text-white"
          >
            Login as {user.email}
          </button>
        ))}
      </div>
    </div>
  );
}
