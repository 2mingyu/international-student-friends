import { useEffect } from "react";
import AppRouter from "./pages/AppRouter";
import useUserStore from "@store/useUserStore";
import { get_users } from "@services/user";

function App() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const id = 1; // TODO: 임시 본인 userId 사용 중
        const userProfile = await get_users(id);
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
