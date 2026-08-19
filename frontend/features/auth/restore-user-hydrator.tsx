"use client";

import { useUser } from "@/store/user";
import { useEffect } from "react";
import restoreSession from "./restore-session";
import { IResponseUser } from "@/types";

export default function RestoreUserHydrator() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      restoreSession().then((user) => {
        setUser(user as IResponseUser);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
