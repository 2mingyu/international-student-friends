import { useEffect } from "react";
import AppRouter from "./pages/AppRouter";
import useUserStore from "@store/useUserStore";
import { get_users_profile } from "@services/apis";

function App() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = 1; // TODO: 임시 본인 userId 사용 중
        const userProfile = await get_users_profile(userId);
        setUser(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
