"use server";

import { IResponseUser } from "@/types";
import { cookies } from "next/headers";

export default async function restoreSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const res = await fetch(`${process.env.API_URL}auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (res.status === 200) {
    const userData = (await res.json()) as IResponseUser;

    const getPhotoResponse = await fetch(`${process.env.API_URL}users/me/img`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });

    let photo = null;
    if (getPhotoResponse.status === 200) {
      photo = await getPhotoResponse.blob();
    }

    return {
      photo,
      data: userData,
      status: 200,
    };
  }

  return;
}
