import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "@pages/RootPage";
import HomePage from "@pages/HomePage";
import FeedPage from "@pages/FeedPage";
import MyPage from "@pages/MyPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
