"use client";

import getMyProfile from "@/features/user/get-my-profile";
import UserProfileActions, {
  UserProfileActionsSkeleton,
} from "./user-profile-actions";
import UserProfileCard, { UserProfileCardSkeleton } from "./user-profile-card";
import { useEffect, useState } from "react";
import { IUser, useUser } from "@/store/user";
import { IResponseUser } from "@/types";
import { toast } from "sonner";

export default function UserProfile() {
  const accessToken = useUser((state) => state.user?.accessToken);
  const { user: updatedUser } = useUser((state) => state);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    let ignore = false;
    if (accessToken && !ignore) {
      const res = getMyProfile(accessToken);
      res
        .then((res) => {
          if (res.status === 200 && res) {
            if (res.photo) {
              res.data.imgUrl = URL.createObjectURL(res.photo);
            }

            setUser(res.data as IResponseUser);
          }
        })
        .catch((err) => {
          toast.warning(err);
        });
    }

    return () => {
      ignore = true;
    };
  }, [accessToken, updatedUser]);

  return (
    <div className="flex gap-x-8 px-12 pt-1">
      {user ? <UserProfileCard {...user} /> : <UserProfileCardSkeleton />}

      {user ? <UserProfileActions {...user} /> : <UserProfileActionsSkeleton />}
    </div>
  );
}
