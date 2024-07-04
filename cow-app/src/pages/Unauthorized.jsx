import { Link } from "react-router-dom";
import LogoLogin from "../assets/Logo-login.svg";
import { Button } from "../components/Button.jsx";

export function Unauthorized() {
  return (
    <section className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <img src={LogoLogin} alt="Logo Cow" className="pb-6" />
        <h1 className="text-3xl font-bold text-brownsec mb-4">
          Unauthorized Access
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          You need to register or log in to access this page.
        </p>
        <div className="flex space-x-4">
          <Link to="/register">
            <Button text="Register" />
          </Link>
          <Link to="/">
            <Button text="Log In" />
          </Link>
        </div>
      </div>
    </section>
  );
}
