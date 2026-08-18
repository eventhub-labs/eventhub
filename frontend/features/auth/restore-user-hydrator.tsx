"use client";

import { useUser } from "@/store/user";
import { IResponseUser } from "@/types";
import { useEffect } from "react";

type RestoreUserHydratorProps = {
  user: IResponseUser;
};

export default function RestoreUserHydrator({
  user,
}: RestoreUserHydratorProps) {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
