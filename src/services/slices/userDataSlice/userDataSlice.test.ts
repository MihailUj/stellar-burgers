import reducer, {
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout,
  getUserOrders
} from './userDataSlice';
import { TOrder, TUser } from '@utils-types';
import { describe, test, expect } from '@jest/globals';
import { TRegisterData, TLoginData, TUserResponse } from '@api';

const mockUser: TUser = {
  email: 'test@mail.com',
  name: 'Иванов Иван Иванович'
};

const mockUserOrders: TOrder[] = [
  {
    _id: '12345',
    status: 'done',
    name: 'Order 123',
    createdAt: '2025-12-30T00:00:00Z',
    updatedAt: '2025-12-30T00:00:00Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  }
];

const mockRegisterData: TRegisterData = {
  email: 'test@mail.com',
  password: '123123',
  name: 'Иванов Иван Иванович'
};

const mockLoginData: TLoginData = {
  email: 'test@mail.com',
  password: '123123'
};

const mockRegisterResponse = {
  success: true,
  user: mockUser,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockLoginResponse = {
  success: true,
  user: mockUser,
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
};

const mockUserResponse = {
  success: true,
  user: mockUser
};

const mockUserOrdersResponse = mockUserOrders;

describe('Тесты для userDataSlice', () => {
  test('Проверка состояний при регистрации пользователя', () => {
    let state = reducer(
      initialState,
      registerUser.pending('requestId', mockRegisterData)
    );
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      registerUser.rejected(new Error('error'), 'requestId', mockRegisterData)
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      registerUser.fulfilled(
        mockRegisterResponse,
        'requestId',
        mockRegisterData
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBe(null);
  });

  

  test('Тест состояний при логине пользователя', () => {
    let state = reducer(
      initialState,
      loginUser.pending('requestId', mockLoginData)
    );
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(null);
    
    state = reducer(
      state,
      loginUser.rejected(new Error('error'), 'requestId', mockLoginData)
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      loginUser.fulfilled(mockLoginResponse, 'requestId', mockLoginData)
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUser);

  });

  test('Тест состояний при получении данных пользователя', () => {
    let state = reducer(initialState, getUser.pending('requestId'));
    expect(state.isLoading).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(null);

    state = reducer(state, getUser.rejected(new Error('error'), 'requestId'));
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(state, getUser.fulfilled(mockUserResponse, 'requestId'));
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUser);
  });

  test('Тест состояний при обновлении данных пользователя', () => {
    const updatedUser = { name: 'Иванов Петр Иванович', email: 'new@mail.com' };
    const mockUpdateResponse: TUserResponse = {
      success: true,
      user: updatedUser
    };

    let state = reducer(
      initialState,
      updateUser.pending('requestId', {
        name: 'Иванов Петр Иванович',
        email: 'new@mail.com'
      })
    );
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      updateUser.rejected(new Error('error'), 'requestId', {})
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      updateUser.fulfilled(mockUpdateResponse, 'requestId', {
        name: 'Иванов Петр Иванович',
        email: 'new@mail.com'
      })
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(updatedUser);

    
  });

  test('Тест состояний при логауте пользователя', () => { 
    let state = reducer(initialState, logout.pending('requestId'));
    expect(state.isLoading).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe(null);

    state = reducer(
      state,
      logout.rejected(new Error('error'), 'requestId')
    );
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(state, logout.fulfilled(undefined, 'requestId'));
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toBe(initialState.user);
  });

  test('Тест состояний при получении заказов', () => {
    let state = reducer(initialState, getUserOrders.pending('requestId'));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);

    state = reducer(state, getUserOrders.rejected(new Error('error'), 'requestId'));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      getUserOrders.fulfilled(mockUserOrdersResponse, 'requestId')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(mockUserOrders);
  });
});
