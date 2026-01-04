import { rootReducer } from './store';
import ordersReducer from './slices/ordersDataSlice/ordersDataSlice';
import userReducer from './slices/userDataSlice/userDataSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import ingredientReducer from './slices/ingredientsSlice/ingredientsSlice';

describe('rootReducer', () => {
  it('должен правильно инициализировать состояние', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState.ingredientsData).toEqual(
      ingredientReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.constructorData).toEqual(
      constructorReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.ordersData).toEqual(
      ordersReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.userData).toEqual(
      userReducer(undefined, { type: '@@INIT' })
    );
  });
});
