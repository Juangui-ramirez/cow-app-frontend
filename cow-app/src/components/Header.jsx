import {Link} from "react-router-dom";
import Logo from "../assets/Logo.svg"

function Header() {
  return (
    <header className="bg-[#36190D]">
        <div className="flex items-center p-2">
            <img src={Logo} alt="Cow Logo" className="size-10"/>
            <h1 className="text-white font-bold p-2">My Cow</h1>
        </div>
        
        <i ></i>
       <div className="w-[70%] flex justify-around items-center gap-[5%]">
        <nav className="w-[70%]">
          <ul className="text-white flex justify-end gap-[10%] font-medium">
            <Link to="/">Home </Link>
            <Link to="/bills">Bills</Link>
            <Link to="/groups">Groups</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
