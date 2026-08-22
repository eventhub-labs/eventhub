"use server";

import parseCookie from "@/lib/parse-cookie";
import { IRequestRegister } from "@/types";
import { cookies } from "next/headers";

export default async function register(formData: FormData) {
  const body: IRequestRegister = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
    name: formData.get("name") as string,
    surname: formData.get("surname") as string,
    phone: formData.get("phone") as string,
  };

  const res = await fetch(`${process.env.API_URL}auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  console.log(res);

  if (res.status === 201) {
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
      status: 201,
    };
  }

  return {
    data: null,
    status: res.status,
  };
}
