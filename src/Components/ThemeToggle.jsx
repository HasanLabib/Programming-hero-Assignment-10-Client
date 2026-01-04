import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const next =
      html.getAttribute("data-theme") === "light" ? "dark" : "light";

    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-xl" />
      ) : (
        <FaMoon className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
