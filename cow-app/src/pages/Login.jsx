import { useState } from "react";
import LogoLogin from "../assets/Logo-login.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.userId);
        navigate("/home");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error to connect database");
    }
  };
  
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clearMessage = () => {
    setMessage("");
  };

  return (
    <section className="min-h-[75vh]">
      <div className="flex justify-center mt-14">
        <img src={LogoLogin} alt="Logo Cow login" className="" />
      </div>

      <h1 className="text-2xl text-center mt-7 font-bold text-brownsec">
        Login
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 mt-8 min-w-[18em]"
        >
          <input
            className="border rounded font-semibold text-brownsec py-2 px-3"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email @"
            required
            onFocus={clearMessage}
          />

          <div className="relative flex items-center">
            <input
              className="border rounded font-semibold text-amarello py-2 px-3 flex-grow"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              onFocus={clearMessage}
            />
            <button
              type="button"
              className="absolute right-2 text-gray-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>

          {message && (
            <p className="text-rederror font-semibold text-center mt-2">
              {message}
            </p>
          )}
          <button
            className="bg-brownppal hover:bg-brownsec text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <Link
            to="/register"
            className="bg-brownppal text-center hover:bg-brownsec text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </Link>
        </form>
      </div>
    </section>
  );
}
