export default function parseCookie(setCookie: string, name: string) {
  const prefix = `${name}=`;

  const cookie = setCookie
    .split(";")
    .find((part) => part.trim().startsWith(prefix));

  return cookie?.trim().slice(prefix.length) || "";
}
