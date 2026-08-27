import UserProfileActions from "./user-prodile-actions";
import UserProfileCard, { UserProfileCardSkeleton } from "./user-profile-card";

export function UserProfileSkeleton() {
  return (
    <div className="flex gap-x-8 px-12 pt-1">
      <UserProfileCardSkeleton />

      <UserProfileActions />
    </div>
  );
}

const user = {
  name: "Stas",
  surname: "Mokhoid",
  email: "stas@gmail.com",
  phone: "0936767673",
  userName: "pozzan",
  imgSrc: null,
};

export default async function UserProfile() {
  // const user = await

  return (
    <div className="flex gap-x-8 px-12 pt-1">
      <UserProfileCard {...user} />

      <UserProfileActions />
    </div>
  );
}
