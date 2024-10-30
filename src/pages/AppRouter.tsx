import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "@pages/RootPage";
import HomePage from "@pages/HomePage";
import FeedPage from "@pages/FeedPage";
import ChatPage from "@pages/ChatPage";
import MyPage from "@pages/MyPage";
import LoginPage from "@pages/LoginPage";
import ProtectedRoute from "@pages/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RootPage />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
