import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import store, { RootState } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyAuthorized
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { isAuthChecked, isAuthenticated } = useSelector(
    (store: RootState) => store.userData
  );

  if (isAuthChecked) {
    console.log('preloader');
    return <Preloader />;
  }

  if (!onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children || <Outlet />;
};
