import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SignupForm = ({ darkMode, onSignup }) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if a user with the same username already exists
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      setError('User already exists! Please log in.');
      toast.error('User already exists! Please log in.');
      return;
    }

    // Store the new user's data in localStorage under their username
    const newUser = { fullname, username, password };
    localStorage.setItem('user_info', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');

    toast.success('User created successfully!');
    onSignup(); 
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="fullname" className="block mb-2 text-white">
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
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
