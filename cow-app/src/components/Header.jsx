import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "./Nav";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { PreferencesToggle } from "./PreferencesToggle";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Limpia el token del sessionStorage
    sessionStorage.removeItem("token");
    // Redirige a la página principal para iniciar sesión
    navigate("/");
  };

  return (
    <header className="bg-brownppal sticky top-0 z-5">
      <div className="w-full flex justify-between items-center p-4">
        <Link to="/home">
          <div className="flex items-center">
            <img src={Logo} alt="Cow Logo" className="size-12" />
            <h1 className="text-white font-bold pl-3 text-xl">{t("nav.appName")}</h1>
          </div>
        </Link>
        {!isMobile && (
          <Nav className="hidden sm:flex" />
        )}
        <div className="flex items-center gap-3">
          <PreferencesToggle variant="onDark" />
          <div className="relative flex">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-white p-2 size-8 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                <button
                  className="w-full px-4 py-2 text-left text-black dark:text-gray-100 font-bold hover:bg-amarello rounded-md"
                  onClick={handleLogout}
                >
                  {t("nav.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <Nav className="sm:hidden" />
      )}
    </header>
  );
};
