import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserState,
  logout
} from '../../services/slices/userDataSlice/userDataSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(getUserState);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      if (error) alert(error);
      else navigate('/login');
    });
  };
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
