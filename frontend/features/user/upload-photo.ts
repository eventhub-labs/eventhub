"use server";

export default async function uploadPhoto(
  formData: FormData,
  accessToken: string,
) {
  const uploadPhotoResponse = await fetch(
    `${process.env.API_URL}users/me/img`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (uploadPhotoResponse.status !== 204) {
    return {
      status: uploadPhotoResponse.status,
    };
  }

  const getPhotoResponse = await fetch(`${process.env.API_URL}users/me/img`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (getPhotoResponse.status === 200) {
    return {
      status: 200,
      photo: await getPhotoResponse.blob(),
    };
  }
}
