"use server";

export default async function getMyProfile(accessToken: string) {
  const res = await fetch(`${process.env.API_URL}users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await res.json();
}
