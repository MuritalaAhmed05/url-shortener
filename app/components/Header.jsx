import { useState, useEffect } from "react";
import * as Switch from "@radix-ui/react-switch"; // Import Switch from Radix UI
import { FaMoon, FaSun } from "react-icons/fa"; // Icons for moon and sun

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode state
  const toggleDarkMode = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
  };

  // Apply dark mode class to root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="flex justify-between items-center w-full p-4 bg-gray-800 text-white transition-all duration-300">
      <h1 className="text-2xl font-bold pl-1 sm:pl-0">URL Shortener</h1>

      {/* Toggle Switch in the header */}
      <div className="flex items-center space-x-2">
        <span className="hidden sm:inline-block text-lg">Light</span>

        <Switch.Root
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          className="relative flex items-center cursor-pointer w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300"
        >
          <Switch.Thumb
            className={`w-7 h-7 bg-transparent rounded-full transition-transform duration-300 transform ${
              isDarkMode ? "translate-x-8" : "translate-x-0"
            }`}
          >
            {/* Icon Animation */}
            {isDarkMode ? (
              <FaSun
                className="absolute left-[6.9px] top-[5px] text-yellow-500 transition-all duration-300 transform scale-150"
              />
            ) : (
              <FaMoon
                className="absolute left-[5px] top-[6px] text-gray-400 transition-all duration-300 transform scale-150"
              />
            )}
          </Switch.Thumb>
        </Switch.Root>

        <span className="hidden sm:inline-block text-lg">Dark</span>
      </div>
    </header>
  );
}
