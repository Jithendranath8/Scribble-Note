import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/image1.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const openModal = (formType) => {
    setIsLogin(formType === "login");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);

    toast.success('Logged in successfully!', {
      toastId: "login-success", 
    });


    setTimeout(() => {
      navigate("/notes");
      closeModal();
    }, 1500); 
  };

  const handleSignup = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);

    toast.success('User created successfully!', {
      toastId: "signup-success", 
    });


    setTimeout(() => {
      navigate("/notes");
      closeModal();
    }, 1500); 
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    toast.info('Logged out successfully!');
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />

      <header className="w-full flex justify-between items-center px-6 md:px-10 py-5">
        <div className="text-xl md:text-2xl font-bold">ScribbleNote</div>
        <div className="flex gap-2 md:gap-4 items-center">
          {isLoggedIn ? (
            <button
              className="bg-white text-black dark:bg-black dark:text-white px-3 md:px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className="border border-white dark:border-black px-3 md:px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
                onClick={() => openModal("login")}
              >
                Log in
              </button>
              <button
                className="bg-white text-black dark:bg-black dark:text-white px-3 md:px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
                onClick={() => openModal("signup")}
              >
                Get ScribbleNote free
              </button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <span role="img" aria-label="Sun">
                🌞
              </span>
            ) : (
              <span role="img" aria-label="Moon">
                🌙
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <div className="flex justify-center mb-6">
          <img
            src={image}
            alt="coverImg"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Your Plans Unified.
            <br />
            Welcome to <span className="underline">ScribbleNote</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            ScribbleNote is the connected workspace where better, faster work happens.
          </p>
          <button
            className="bg-white text-black dark:bg-black dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md text-base sm:text-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition duration-300"
            onClick={() => openModal("signup")}
          >
            Get ScribbleNote free →
          </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isLogin ? "Log In" : "Sign Up"}
            </h2>
            {isLogin ? (
              <LoginForm darkMode={darkMode} onLogin={handleLogin} />
            ) : (
              <SignupForm darkMode={darkMode} onSignup={handleSignup} />
            )}
            <p className="mt-4 text-sm text-center text-white">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
