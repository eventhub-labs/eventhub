"use server";
import { cookies } from "next/headers";

export default async function logout() {
  const cookiesStore = await cookies();
  cookiesStore.delete("refreshToken");

  return { message: "successful" };
}
