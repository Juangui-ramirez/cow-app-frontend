import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <header className="bg-brownppal sticky top-0 z-5">
      <div className="w-full flex justify-between p-4">
        <Link to="/home">
          <div className="flex items-center">
            <img src={Logo} alt="Cow Logo" className="size-12" />

            <h1 className="text-white font-bold pl-3 text-xl">My Cow</h1>
          </div>
        </Link>
        <Link to="/">
          <div className="flex">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-white p-2 size-8"
            />
          </div>
        </Link>
      </div>

      <nav>
        <ul className="text-white text-xl font-bold flex justify-around p-2 gap-10 ">
          <Link
            to="/friends"
            className={`relative ${activeLink === "/friends" ? "active" : ""}`}
          >
            Friends
            {activeLink === "/friends" && (
              <FontAwesomeIcon
                icon={faCaretUp}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8"
              />
            )}
          </Link>

          <Link
            to="/bills"
            className={`relative ${activeLink === "/bills" ? "active" : ""}`}
          >
            Bills
            {activeLink === "/bills" && (
              <FontAwesomeIcon
                icon={faCaretUp}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8"
              />
            )}
          </Link>

          <Link
            to="/groups"
            className={`relative ${activeLink === "/groups" ? "active" : ""}`}
          >
            Groups
            {activeLink === "/groups" && (
              <FontAwesomeIcon
                icon={faCaretUp}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-6 size-8"
              />
            )}
          </Link>
        </ul>
      </nav>
    </header>
  );
};