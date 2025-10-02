import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import UploadPage from './pages/UploadPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';

function App(){
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/agents" element={<PrivateRoute><Agents/></PrivateRoute>} />
          <Route path="/upload" element={<PrivateRoute><UploadPage/></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
