"use client";

import { useUser } from "@/store/user";
import { useEffect } from "react";
import restoreSession from "./restore-session";
import { IResponseUser } from "@/types";
import { toast } from "sonner";

export default function RestoreUserHydrator() {
  const { user, setUser, setStatus } = useUser();

  useEffect(() => {
    if (!user) {
      setStatus("fetching");
      restoreSession()
        .then((res) => {
          if (res?.status === 200 && res) {
            if (res.photo) {
              res.data.imgUrl = URL.createObjectURL(res.photo);
            }
            setUser(res.data as IResponseUser);
            setStatus("authorized");
          } else {
            toast.warning("Unauthorized");
            setStatus("unauthorized");
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
