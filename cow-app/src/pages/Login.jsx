import { useState } from "react";
import LogoLogin from "../assets/Logo-login.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="min-h-[75vh]">
      <Link to="/home">
        <div className="flex justify-center mt-14">
          <img src={LogoLogin} alt="Logo Cow login" className="" />
        </div>
      </Link>

      <h1 className=" text-2xl text-center mt-7 font-bold text-brownsec">
        Login
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 mt-8 min-w-[18em]"
        >
          <input
            className="border rounded font-semibold text-brownsec py-2 px-3"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />

          <input
            className="border rounded font-semibold text-brownsec py-2 px-3"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email @"
            required
          />

          <div className="relative">
            <input
              className="border rounded font-semibold text-amarello py-2 px-3"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash}/>}
            </button>
          </div>
          
          {message && (
            <p className="text-rederror font-semibold text-center mt-2">{message}</p>
          )}
          <button
            className="bg-brownppal hover:bg-brownsec text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
