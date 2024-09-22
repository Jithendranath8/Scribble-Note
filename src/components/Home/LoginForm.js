import React, { useState } from 'react';

const LoginForm = ({ darkMode, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch the stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem(username));

    if (storedUser && storedUser.password === password) {
      // Login successful: Set logged in status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      onLogin(); // Call the parent component's callback to close the modal or redirect
    } else {
      setError('Invalid username or password');
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
          className="w-full px-4 py-2 text-balck"
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-md ${
          darkMode ? 'bg-sky-700 text-black' : 'bg-sky-700 text-white'
        } hover:bg-sky-900`}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
