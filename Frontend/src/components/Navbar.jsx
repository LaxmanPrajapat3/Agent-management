import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-5xl mx-auto flex justify-between">
        <div className="font-bold">MERN Distributor</div>
        <div className="flex gap-3 items-center">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/agents" className="hover:underline">Agents</Link>
          <Link to="/upload" className="hover:underline">Upload</Link>
          {token ? <button onClick={logout} className="text-red-600">Logout</button> : <Link to="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
