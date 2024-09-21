import React, { useState } from 'react';

const SignupForm = ({ darkMode, onSignup }) => {
  const [fullname, setfullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();


    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert("User already exists! Please log in.")
      setError('User already exists! Please log in.');
      return ;
    }

    localStorage.setItem("user_info", JSON.stringify({ fullname, username, password }));
    localStorage.setItem('isLoggedIn', 'true');

    // Calling the parent component's function to redirect 
    onSignup();
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="Fullname" className="block mb-2 text-white">
          Fullname
        </label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
          className="w-full px-4 py-2 text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="username" className="block mb-2 text-white">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 text-black"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md ${
          darkMode ? 'bg-sky-800 text-black' : 'bg-sky-800 text-white'
        } hover:bg-sky-900`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
