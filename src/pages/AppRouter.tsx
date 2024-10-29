import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "@pages/RootPage";
import HomePage from "@pages/HomePage";
import FeedPage from "@pages/FeedPage";
import MyPage from "@pages/MyPage";
import LoginPage from "@pages/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
