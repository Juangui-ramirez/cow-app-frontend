import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
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
          <Link to="/friends">Friends</Link>

          <Link to="/bills">Bills</Link>

          <Link to="/groups">Groups</Link>
        </ul>
      </nav>
    </header>
  );
};
