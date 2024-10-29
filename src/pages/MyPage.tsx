import { useState } from "react";
import MyPageCategories from "@components/MyPageCategories";
import MyPageMyInfo from "@components/MyPageMyInfo";

export default function MyPage() {
  const [selectedCategory, setSelectedCategory] = useState("내 정보");

  const categories = {
    계정: ["내 정보", "비밀번호 변경"],
    서비스: ["메시지 관리", "피드 관리", "베타서비스"],
    이용안내: [
      "공지사항",
      "이용약관",
      "개인정보처리",
      "신고내역",
      "1:1 문의",
      "고객센터",
    ],
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case "내 정보":
        return <MyPageMyInfo />;
      default:
        return <div>미구현</div>; // TODO X: 미구현 상태
    }
  };

  return (
    <div className="flex flex-grow">
      <MyPageCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="w-2/3 p-3">{renderContent()}</div>
    </div>
  );
}
