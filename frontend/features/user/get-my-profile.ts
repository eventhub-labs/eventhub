"use server";

import { IResponseUser } from "@/types";

export default async function getMyProfile(accessToken: string) {
  const res = await fetch(`${process.env.API_URL}users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 200) {
    const userData = (await res.json()) as IResponseUser;

    const getPhotoResponse = await fetch(`${process.env.API_URL}users/me/img`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

  return {
    status: res.status,
  };
}
