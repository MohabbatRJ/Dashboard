// protected-routes/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useMemo } from 'react';


const ProtectedRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isUserAuthenticated = useMemo(() => {
    return isLoggedIn;
  }, [isLoggedIn]);

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
