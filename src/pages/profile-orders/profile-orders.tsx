import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  getUserState
} from '../../services/slices/userDataSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(getUserState).orders;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
