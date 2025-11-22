import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getFeedsThunk,
  getOrdersState
} from '../../services/slices/ordersDataSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const ordersData = useSelector(getOrdersState);
  const ingredients = useSelector(getIngredientsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  const getFeeds = () => {
    getFeedsThunk();
  };

  if (ordersData.isLoading && ingredients.isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  } else {
    return (
      <>
        <FeedUI orders={ordersData.orders || []} handleGetFeeds={getFeeds} />
      </>
    );
  }
};
