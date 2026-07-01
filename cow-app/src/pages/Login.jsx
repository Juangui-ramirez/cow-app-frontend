import { useState } from "react";
import LogoLogin from "../assets/Logo-login.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import { PreferencesToggle } from "../components/PreferencesToggle";

const API_URL = import.meta.env.VITE_API_URL;

export function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}auth/login`, {
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
      setMessage(t("login.error.connection"));
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
      <div className="flex justify-end p-4">
        <PreferencesToggle />
      </div>
      <div className="flex justify-center mt-4">
        <img src={LogoLogin} alt="Logo Cow login" className="" />
      </div>

      <h1 className="text-2xl text-center mt-7 font-bold text-brownsec dark:text-amarello">
        {t("login.title")}
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 mt-8 min-w-[18em]"
        >
          <input
            className="border rounded font-semibold text-brownsec py-2 px-3 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("login.email")}
            required
            onFocus={clearMessage}
          />

          <div className="relative flex items-center">
            <input
              className="border rounded font-semibold text-amarello py-2 px-3 flex-grow dark:bg-gray-800 dark:border-gray-600"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login.password")}
              required
              onFocus={clearMessage}
            />
            <button
              type="button"
              className="absolute right-2 text-amarello"
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
            {t("login.submit")}
          </button>
          <Link
            to="/register"
            className="bg-brownppal text-center hover:bg-brownsec text-white font-semibold py-2 px-4 rounded"
          >
            {t("login.register")}
          </Link>
        </form>
      </div>
    </section>
  );
}
