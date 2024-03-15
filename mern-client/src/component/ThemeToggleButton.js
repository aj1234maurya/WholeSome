// ThemeToggleButton.js
import React from "react";
import { useTheme } from "./ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="toggleButton" onClick={toggleTheme}>
      {theme === "light" ? (
        <MdOutlineDarkMode size={"30px"} className="light-svg" />
      ) : (
        <CiLight size={"30px"} className="dark-svg" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
