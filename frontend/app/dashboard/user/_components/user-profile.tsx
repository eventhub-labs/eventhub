"use client";

import getMyProfile from "@/features/user/get-my-profile";
import UserProfileActions, {
  UserProfileActionsSkeleton,
} from "./user-profile-actions";
import UserProfileCard, { UserProfileCardSkeleton } from "./user-profile-card";
import { useEffect, useState } from "react";
import { useUser } from "@/store/user";
import { IResponseUser } from "@/types";

export default function UserProfile() {
  const accessToken = useUser((state) => state.user?.accessToken);
  const [user, setUser] = useState<IResponseUser | null>(null);

  useEffect(() => {
    let ignore = false;
    if (accessToken && !ignore) {
      const res = getMyProfile(accessToken);
      res.then((data) => setUser(data));
    }

    return () => {
      ignore = true;
    };
  }, [accessToken]);

  return (
    <div className="flex gap-x-8 px-12 pt-1">
      {user ? <UserProfileCard {...user} /> : <UserProfileCardSkeleton />}

      {user ? <UserProfileActions {...user} /> : <UserProfileActionsSkeleton />}
    </div>
  );
}
