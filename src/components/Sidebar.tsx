import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Close from "@assets/close.svg";
import { routesData } from "@data/routes";
import useUserStore from "@store/useUserStore";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    // 사이드바가 열리면 body 스크롤을 막음
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // 컴포넌트 언마운트 시 스크롤을 다시 활성화
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  type LanguageCode = "ko" | "en" | "fr" | "ja" | "de" | "zh";
  let language: LanguageCode = "ko";
  if (user.preferredLanguage === "en") language = "en";
  else if (user.preferredLanguage === "fr") language = "fr";
  else if (user.preferredLanguage === "ja") language = "ja";
  else if (user.preferredLanguage === "de") language = "de";
  else if (user.preferredLanguage === "zh") language = "zh";

  return (
    <>
      {/* 사이드바 */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-80 transform bg-white shadow-lg transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <img
            src={Close}
            onClick={onClose}
            className="size-7 cursor-pointer"
          />
          <ul className="mt-4">
            {routesData.map((route) => (
              <li
                key={route.path}
                className="cursor-pointer border-b py-2"
                onClick={() => {
                  if (route.path !== "/feed") {
                    navigate(route.path);
                  }
                  onClose();
                }}
              >
                {route.name[language]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 오버레이 배경 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
    </>
  );
}
