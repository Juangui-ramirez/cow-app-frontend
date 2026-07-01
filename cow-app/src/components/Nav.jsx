import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";

export const Nav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav>
      <ul className="text-white text-xl font-bold flex justify-around p-2 gap-10 ">
        <Link
          to="/friends"
          className={`relative ${activeLink === "/friends" ? "active" : ""}`}
        >
          {t("nav.friends")}
          {activeLink === "/friends" && (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8 md:-mb-12 md:size-12"
            />
          )}
        </Link>

        <Link
          to="/bills"
          className={`relative ${activeLink === "/bills" ? "active" : ""}`}
        >
          {t("nav.bills")}
          {activeLink === "/bills" && (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8 md:-mb-12 md:size-12"
            />
          )}
        </Link>

        <Link
          to="/groups"
          className={`relative ${activeLink === "/groups" ? "active" : ""}`}
        >
          {t("nav.groups")}
          {activeLink === "/groups" && (
            <FontAwesomeIcon
              icon={faCaretUp}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8 md:-mb-12 md:size-12"
            />
          )}
        </Link>
      </ul>
    </nav>
  );
};
