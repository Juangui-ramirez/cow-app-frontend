import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "./Nav";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <header className="bg-brownppal sticky top-0 z-5">
      <div className="w-full flex justify-between p-4">
        <Link to="/home">
          <div className="flex items-center">
            <img src={Logo} alt="Cow Logo" className="size-12" />
            <h1 className="text-white font-bold pl-3 text-xl">My Cow</h1>
          </div>
        </Link>
        {!isMobile && (
          <Nav className="hidden sm:flex" />
        )}
        <Link to="/">
          <div className="flex">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-white p-2 size-8"
            />
          </div>
        </Link>
      </div>

      {isMobile && (
        <Nav className="sm:hidden" />
      )}
    </header>
  );
};
