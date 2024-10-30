import Menu from "@assets/menu.svg";
import AccountCircle from "@assets/account_circle.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { routesData } from "@data/routes";
import useUserStore from "@store/useUserStore";

interface HeaderProps {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  const currentRoute = routesData.find(
    (route) => route.path === location.pathname,
  );

  let headerTitle = currentRoute?.name.ko || "";
  if (user.preferredLanguage === "English")
    headerTitle = currentRoute?.name.en || "";
  else if (user.preferredLanguage === "French")
    headerTitle = currentRoute?.name.fr || "";
  else if (user.preferredLanguage === "Japanese")
    headerTitle = currentRoute?.name.ja || "";
  else if (user.preferredLanguage === "German")
    headerTitle = currentRoute?.name.de || "";
  else if (user.preferredLanguage === "Chinese")
    headerTitle = currentRoute?.name.zh || "";

  return (
    <header className="flex flex-row items-center justify-between bg-blue-50 px-4 py-4">
      <img src={Menu} className="size-7 cursor-pointer" onClick={openSidebar} />
      <h3 className="text-center text-xl">{headerTitle}</h3>
      <img
        src={AccountCircle}
        className="size-7"
        onClick={() => navigate("/mypage")}
      />
    </header>
  );
}
