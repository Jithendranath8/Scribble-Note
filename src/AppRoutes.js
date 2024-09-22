import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Some from './components/NotesEditor/some';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <div className="min-h-screen bg-gray-900 text-white">
              <Some />
            </div>
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
