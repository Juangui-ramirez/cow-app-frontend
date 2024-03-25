import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="bg-[#36190D]">
      <div className="w-full flex justify-between p-4">
        <div className="flex items-center">
          <img src={Logo} alt="Cow Logo" className="size-12" />
          <h1 className="text-white font-bold pl-3 text-xl">My Cow</h1>
        </div>
        <div className="flex">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-white p-2 size-8"
          />
        </div>
      </div>

      <nav>
        <ul className="text-white text-xl font-bold flex justify-around p-2 gap-10 ">
          <Link to="/">Friends</Link>

          <Link to="/bills">Bills</Link>

          <Link to="/groups">Groups</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
