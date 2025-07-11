import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useSelector(state => state.userAuth);
  const isLoggedIn = userAuth?.token;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
