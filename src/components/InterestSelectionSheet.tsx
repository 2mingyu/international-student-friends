import { useState, useEffect } from "react";
import { Sheet } from "react-modal-sheet";
import interestTitles from "@data/interestTitles";
import useUserStore from "@store/useUserStore";

interface InterestSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InterestSelectionSheet({
  isOpen,
  onClose,
}: InterestSelectionSheetProps) {
  const { user } = useUserStore(); // 현재 유저 정보 가져오기
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // 시트가 열릴 때 user의 관심사에 따라 체크박스를 설정
  useEffect(() => {
    if (isOpen) {
      setSelectedInterests(user.interests.map((interest) => interest.content));
    }
  }, [isOpen, user.interests]);

  const handleInterestChange = (interest: string) => {
    // 선택/해제 로직
    setSelectedInterests((prevSelected) =>
      prevSelected.includes(interest)
        ? prevSelected.filter((item) => item !== interest)
        : [...prevSelected, interest],
    );
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">
              관심사를 골라주세요 (두 가지 이상)
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(interestTitles).map((interestKey, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedInterests.includes(interestKey)} // 선택된 항목 체크
                    onChange={() => handleInterestChange(interestKey)} // 선택 로직
                  />
                  {interestTitles[interestKey]} {/* 타이틀 표시 */}
                </label>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
            >
              저장 후 닫기
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
