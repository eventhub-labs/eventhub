"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const logoSrcs = {
  dark: "/img/logo.svg",
  light: "/img/logo-light.svg",
};

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    //eslint-disable-next-line
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Image
      width={199}
      height={39}
      className="w-full"
      alt="logo"
      src={resolvedTheme === "dark" ? logoSrcs.dark : logoSrcs.light}
    />
  );
}
