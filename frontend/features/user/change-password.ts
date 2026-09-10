"use server";

import { IRequestChangePassword } from "@/types";

export default async function changePassword(
  formData: FormData,
  accessToken: string,
) {
  const body: IRequestChangePassword = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
  };

  const res = await fetch(`${process.env.API_URL}users/me/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  console.log(res);

  if (res.status === 204) {
    return {
      status: 204,
    };
  }
}
