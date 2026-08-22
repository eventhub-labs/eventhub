"use client";

import { useUser } from "@/store/user";
import { useEffect } from "react";
import restoreSession from "./restore-session";
import { IResponseUser } from "@/types";
import { toast } from "sonner";

export default function RestoreUserHydrator() {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (!user) {
      restoreSession()
        .then((user) => {
          if (user?.status === 200 && user) {
            setUser(user.data as IResponseUser);
          } else {
            toast.warning("Unauthorized");
          }
        })
        .catch((err) => {
          toast.warning(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
