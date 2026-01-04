import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { RootState } from '../../store';
import { act } from 'react-dom/test-utils';

export const loginUser = createAsyncThunk(
  '/user/login',
  async (loginData: TLoginData) =>
    await loginUserApi(loginData).then((data) => {
      if (!data.success) {
        return data;
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const registerUser = createAsyncThunk(
  '/user/register',
  async (registerData: TRegisterData) =>
    await registerUserApi(registerData).then((data) => {
      if (!data.success) {
        return data;
      }
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    })
);

export const getUser = createAsyncThunk('/user/getUser', getUserApi);
export const logout = createAsyncThunk('/user/logout', () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);
export const updateUser = createAsyncThunk('/user/updateUser', updateUserApi);
export const getUserOrders = createAsyncThunk('/user/orders', getOrdersApi);

export interface UserState {
  isLoading: boolean;
  user: TUser;
  error: string | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  orders: TOrder[];
}

export const initialState: UserState = {
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  error: null,
  isAuthChecked: false,
  isAuthenticated: false,
  orders: []
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.error = action.error.message as string;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.error = null;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.error = null;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
      state.error = action.error.message as string;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
      state.user = payload.user;
      state.error = null;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.error = action.error.message as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getUserOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
      state.error = null;
    });
  }
});

export const getUserState = (state: RootState): UserState => state.userData;

export default userDataSlice.reducer;
