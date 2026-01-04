import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorState,
  getOrderModalData,
  getOrderRequest,
  orderBurger,
  resetModal
} from '../../services/slices/constructorSlice/constructorSlice';
import { getUserState } from '../../services/slices/userDataSlice/userDataSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorState);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(getUserState).isAuthenticated;
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  let orderItems: string[] = [];
  const ingredients: string[] | void = constructorItems.ingredients.map(
    (i) => i._id
  );
  if (constructorItems.bun) {
    const bun = constructorItems.bun?._id;
    orderItems = [bun, ...ingredients, bun];
  }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    else if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(orderBurger(orderItems));
    }
  };

  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
