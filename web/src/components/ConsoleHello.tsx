"use client";

import { useEffect } from "react";

import { profile } from "@/data/profile";

// Easter egg for anyone who opens DevTools: the people who read the console
// are usually the people worth talking to.
export function ConsoleHello() {
  useEffect(() => {
    console.log(
      `%cHola. You opened the console.%c\nIf you're curious how this site works, the source is public: https://github.com/josemunizdev/personal-portfolio\nIf you're hiring for integration work: ${profile.email}`,
      "font: 600 16px system-ui; color: #6d4aa8",
      "font: 13px system-ui",
    );
  }, []);
  return null;
}
