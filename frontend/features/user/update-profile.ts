"use server";

import { IRequestUpdateUser } from "@/types";

export default async function updateProfile(
  formData: FormData,
  accessToken: string,
) {
  const body: IRequestUpdateUser = {
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    username: formData.get("username") as string,
    phone: formData.get("phone") as string,
  };

  const res = await fetch(`${process.env.API_URL}users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (res.status === 200) {
    return {
      status: 200,
      data: await res.json(),
    };
  }
}
