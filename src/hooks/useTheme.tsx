'use client';

import React from "react";

export type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toogleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toogleTheme };
};