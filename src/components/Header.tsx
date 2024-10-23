import Menu from "@assets/menu.svg";
import AccountCircle from "@assets/account_circle.svg";

export default function Header() {
  return (
    <header className="flex flex-row justify-between bg-blue-50 px-4 py-4">
      <img src={Menu} className="size-7" />
      <h3 className="text-xl">유학생 멘토 찾기</h3>
      <img src={AccountCircle} className="size-7" />
    </header>
  );
}
