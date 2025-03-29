import React from "react";

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
    >
      {theme === "light" ? " Dark Mode" : "Light Mode"}
    </button>
  );
}

export default ThemeToggle;
