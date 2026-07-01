import PropTypes from "prop-types";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export const PreferencesToggle = ({ className, variant }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const buttonClass =
    variant === "onDark"
      ? "border-white/40 text-white"
      : "border-brownppal/40 text-brownppal dark:border-gray-500 dark:text-gray-100";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={toggleLanguage}
        className={`rounded-md border px-2 py-1 text-xs font-bold ${buttonClass}`}
        title={t("common.language")}
      >
        {language === "en" ? "ES" : "EN"}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className={`rounded-md border px-2 py-1 text-xs font-bold ${buttonClass}`}
        title={theme === "dark" ? t("common.theme.light") : t("common.theme.dark")}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
};

PreferencesToggle.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["onDark", "onLight"]),
};

PreferencesToggle.defaultProps = {
  className: "",
  variant: "onLight",
};
