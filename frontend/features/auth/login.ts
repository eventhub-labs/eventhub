"use server";

export default async function login(formData: FormData) {
  console.log(formData.get("email"));
}
