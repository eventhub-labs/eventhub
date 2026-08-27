import { Suspense } from "react";
import UserProfile from "./_components/user-profile";

export default async function UserPage() {
  return (
    <div className="flex">
      <Suspense>
        <UserProfile />
      </Suspense>
    </div>
  );
}
