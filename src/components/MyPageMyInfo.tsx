import { useState } from "react";
import useUserStore from "@store/useUserStore";
import { put_users } from "@services/user";
import InterestSelectionSheet from "@components/InterestSelectionSheet";
import { countries, languages, majors } from "@data/datas";

export default function MyPageMyInfo() {
  const { setUser, user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    country: "",
    preferredLanguage: "",
    major: "",
  });

  const handleEdit = () => {
    setEditedUser({
      name: user.name,
      country: user.country,
      preferredLanguage: user.preferredLanguage,
      major: user.major,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await put_users(
        user.userId,
        editedUser.name,
        editedUser.country,
        user.profileImage, // TODO X: 프로필 이미지 수정
        editedUser.preferredLanguage,
        editedUser.major,
      );
      setUser({
        ...user,
        name: response.name,
        country: response.country,
        profileImage: response.profileImage,
        preferredLanguage: response.preferredLanguage,
        major: response.major,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user info", error);
    }
  };

  const openSheet = () => {
    setIsSheetOpen(true);
  };

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 프로필 이미지 */}
      <div className="flex gap-2">
        <h1 className="min-w-20 self-center font-semibold text-gray-500">
          Image
        </h1>
        <img
          src={user.profileImage}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>

      {/* Name */}
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Name</h1>
        {isEditing ? (
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) =>
              setEditedUser({ ...editedUser, name: e.target.value })
            }
            className="max-w-32 border-b-2 border-gray-300 px-0.5 py-1 text-sm focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <p className="font-semibold">{user.name}</p>
        )}
      </div>

      {/* Country */}
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Country</h1>
        {isEditing ? (
          <select
            value={editedUser.country}
            onChange={(e) =>
              setEditedUser({ ...editedUser, country: e.target.value })
            }
            className="max-w-32 border-b-2 border-gray-300 px-0.5 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            {countries.map((country, index) => (
              <option key={index} value={country.en}>
                {country.en}
              </option>
            ))}
          </select>
        ) : (
          <p className="font-semibold">{user.country}</p>
        )}
      </div>

      {/* Language */}
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Language</h1>
        {isEditing ? (
          <select
            value={editedUser.preferredLanguage}
            onChange={(e) =>
              setEditedUser({
                ...editedUser,
                preferredLanguage: e.target.value,
              })
            }
            className="max-w-32 border-b-2 border-gray-300 px-0.5 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            {languages.map((language, index) => (
              <option key={index} value={language.en}>
                {language.en}
              </option>
            ))}
          </select>
        ) : (
          <p className="font-semibold">{user.preferredLanguage}</p>
        )}
      </div>

      {/* Major */}
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Major</h1>
        {isEditing ? (
          <select
            value={editedUser.major}
            onChange={(e) =>
              setEditedUser({ ...editedUser, major: e.target.value })
            }
            className="max-w-32 border-b-2 border-gray-300 px-0.5 py-1 text-sm focus:border-blue-500 focus:outline-none"
          >
            {majors.map((major, index) => (
              <option key={index} value={major.en}>
                {major.en}
              </option>
            ))}
          </select>
        ) : (
          <p className="font-semibold">{user.major}</p>
        )}
      </div>

      {/* Interests */}
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Interests</h1>

        <div>
          {isEditing && (
            <p className="cursor-pointer underline" onClick={openSheet}>
              edit{" "}
            </p>
          )}
          {user.interests.map((interest, index) => (
            <p key={index} className="font-semibold">
              {interest.content}
            </p>
          ))}
        </div>
      </div>

      {/* Edit/Save/Cancel 버튼 */}
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="rounded bg-gray-400 px-4 py-2 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Edit
          </button>
        )}
      </div>
      <InterestSelectionSheet isOpen={isSheetOpen} onClose={closeSheet} />
    </div>
  );
}
