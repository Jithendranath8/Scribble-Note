import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = ({ darkMode, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve the stored user data based on the username
    const storedUser = JSON.parse(localStorage.getItem("user_info"));

    // Validate if the user exists and the password matches
    if (storedUser && storedUser.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Logged in successfully!');
      onLogin();
    } else {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
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
        className={`w-full py-2 px-4 rounded-md bg-sky-700 text-black hover:bg-sky-900`}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
