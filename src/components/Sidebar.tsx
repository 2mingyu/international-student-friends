import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Close from "@assets/close.svg";
import { routesData } from "@data/routes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

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
                  navigate(route.path);
                  onClose();
                }}
              >
                {route.name}
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
