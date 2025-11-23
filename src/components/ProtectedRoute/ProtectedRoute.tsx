import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getUserState } from '../../services/slices/userDataSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyAuthorized
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { isAuthChecked, isAuthenticated } = useSelector(getUserState);

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children || <Outlet />;
};
