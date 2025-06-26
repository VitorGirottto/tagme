import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import Login from './Login';
import Cadastro from './Cadastro'; // 👈 import da nova página
import Feed from './Feed';
import Profile from './Profile';

const Protected = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> {/* 👈 nova rota */}
        <Route path="/" element={<Protected><Feed /></Protected>} />
        <Route path="/profile/:id" element={<Protected><Profile /></Protected>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
