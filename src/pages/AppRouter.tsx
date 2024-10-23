import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "@pages/RootPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  );
}
