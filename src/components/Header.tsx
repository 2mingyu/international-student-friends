import Menu from "@assets/menu.svg";
import AccountCircle from "@assets/account_circle.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { routesData } from "@data/routes";

interface HeaderProps {
  openSidebar: () => void;
}

export default function Header({ openSidebar }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = routesData.find(
    (route) => route.path === location.pathname,
  );
  const headerTitle = currentRoute ? currentRoute.name : "";

  return (
    <header className="flex flex-row justify-between bg-blue-50 px-4 py-4">
      <img src={Menu} className="size-7 cursor-pointer" onClick={openSidebar} />
      <h3 className="text-xl">{headerTitle}</h3>
      <img
        src={AccountCircle}
        className="size-7"
        onClick={() => navigate("/mypage")}
      />
    </header>
  );
}
