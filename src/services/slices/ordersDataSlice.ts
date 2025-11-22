import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../store';

export const getFeedsThunk = createAsyncThunk('/orders/all', () =>
  getFeedsApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  '/orders/:number',
  async (number: number) => getOrderByNumberApi(number)
);

export interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  orderData: TOrder | null;
}

const initialState: OrdersState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  orderData: null
};

export const ordersSlice = createSlice({
  name: 'ordersData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    });

    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderData = payload.orders[0];
    });
  }
});

export const getOrdersState = (state: RootState): OrdersState =>
  state.ordersData;

export default ordersSlice.reducer;
