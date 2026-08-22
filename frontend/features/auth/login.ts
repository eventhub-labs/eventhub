"use server";

import parseCookie from "@/lib/parse-cookie";
import { IRequestLogin } from "@/types";
import { cookies } from "next/headers";

export default async function login(formData: FormData) {
  const body: IRequestLogin = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const res = await fetch(`${process.env.API_URL}auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(res);
  if (res.status === 200) {
    const setCookie = res.headers.get("set-cookie");
    const token = parseCookie(setCookie || "", "refreshToken");
    const cookiesStore = await cookies();
    cookiesStore.set("refreshToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return {
      data: await res.json(),
      status: 200,
    };
  }

  return {
    data: null,
    status: res.status,
  };
}
