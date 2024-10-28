import useUserStore from "@store/useUserStore";

export default function MyPageMyInfo() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <h1 className="min-w-20 self-center font-semibold text-gray-500">
          Image
        </h1>
        <img
          src={user.profileImage}
          alt="user.profileImage"
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Name</h1>
        <p className="font-semibold">{user.name}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Country</h1>
        <p className="font-semibold">{user.country}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Major</h1>
        <p className="font-semibold">{user.major}</p>
      </div>
      <div className="flex gap-2">
        <h1 className="min-w-20 font-semibold text-gray-500">Interests</h1>
        <div>
          {user.interests.map((interest, index) => (
            <p className="font-semibold" key={index}>
              {interest.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
