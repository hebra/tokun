/**
 * Theme management for Tokun.
 */

const THEME_KEY = "tokun-theme";
const themeToggle = document.getElementById("theme-toggle");

/**
 * Updates the ARIA label of the theme toggle button.
 * @param {string} theme - The current theme.
 */
function updateAriaLabel(theme) {
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Toggle light mode" : "Toggle dark mode",
    );
  }
}

/**
 * Applies the selected theme.
 * @param {string} theme - The theme to apply ('dark' | 'light').
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  updateAriaLabel(theme);
}

/**
 * Toggles the current theme.
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") ||
    "light";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
}

/**
 * Initializes the theme based on user preference or system setting.
 */
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const theme = savedTheme || systemTheme;
  applyTheme(theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

// Listen for system theme changes
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

initTheme();
