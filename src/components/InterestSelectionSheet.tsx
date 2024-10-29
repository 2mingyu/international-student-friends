import { useState, useEffect } from "react";
import { Sheet } from "react-modal-sheet";
import { interests } from "@data/datas";
import useUserStore from "@store/useUserStore";

interface InterestSelectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InterestSelectionSheet({
  isOpen,
  onClose,
}: InterestSelectionSheetProps) {
  const { user } = useUserStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // 시트가 열릴 때 user의 관심사에 따라 체크박스를 설정
  useEffect(() => {
    if (isOpen) {
      setSelectedInterests(user.interests.map((interest) => interest.content));
    }
  }, [isOpen, user.interests]);

  // 선택/해제 로직
  const handleInterestChange = (interest: string) => {
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
          <div className="flex h-full flex-col p-4">
            <h2 className="mb-8 text-center text-xl font-semibold">
              Select your interests
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(interests).map((interestKey, index) => (
                <div
                  key={index}
                  onClick={() => handleInterestChange(interestKey)}
                  className={`flex h-16 w-full cursor-pointer items-center justify-center rounded-lg border-2 p-3 text-center ${
                    selectedInterests.includes(interestKey)
                      ? "border-blue-500 text-blue-500"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  {`${interestKey} ${interests[interestKey].emoji}`}
                </div>
              ))}
            </div>
            <button
              onClick={onClose} // TODO: 관심사 변경
              className="mt-auto w-full rounded bg-blue-500 px-4 py-2 text-white"
            >
              Save and Close
            </button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
