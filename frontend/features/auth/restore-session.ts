"use server";

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

  return await res.json();
}
