import useUserStore from "@store/useUserStore";
import InterestMatches from "@components/InterestMatches";

export default function HomePage() {
  const { user } = useUserStore();

  return (
    <div className="p-4">
      {user.interests.map((interest, index) => (
        <InterestMatches
          key={interest.content}
          interest={interest.content}
          language={user.preferredLanguage}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
}
