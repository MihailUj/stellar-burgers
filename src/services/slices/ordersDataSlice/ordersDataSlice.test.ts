import { TFeedsResponse, TOrderResponse } from "@api";
import { TOrder } from "@utils-types";
import reducer, {initialState, getFeedsThunk, getOrderByNumber} from "./ordersDataSlice";


const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test order',
  createdAt: '2025-12-30T00:00:00Z',
  updatedAt: '2025-12-30T00:00:00Z',
  number: 1,
  ingredients: ['ingredient1', 'ingredient2']
}

const mockOrders: TOrder[] = [
  {
  _id: '1',
  status: 'done',
  name: 'Test order1',
  createdAt: '2025-12-30T00:00:00Z',
  updatedAt: '2025-12-30T00:00:00Z',
  number: 1,
  ingredients: ['ingredient1', 'ingredient2']
  }, 
  {
    _id: '2',
    status: 'done',
    name: 'Test order2',
    createdAt: '2025-12-31T00:00:00Z',
    updatedAt: '2025-12-31T00:00:00Z',
    number: 2,
    ingredients: ['ingredient3', 'ingredient4']
  }
]

const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [mockOrder]
};

const mockOrdersResponse: TFeedsResponse = {
  success: true,
  orders: mockOrders,
  total: 2,
  totalToday: 1
}

describe('Тесты для ordersDataSlice', () => {
  test('Тест состояний при получении списка заказов', () => {
    let state = reducer(initialState, getFeedsThunk.pending('requestId'));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);

    state = reducer(state, getFeedsThunk.rejected(new Error('error'), 'requestId'));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      getFeedsThunk.fulfilled(mockOrdersResponse, 'requestId')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toEqual(2);
    expect(state.totalToday).toEqual(1);
  });

  test('Тест состояний загрузки информации по номеру заказа', async () => {
    let state = reducer(initialState, getOrderByNumber.pending('pending', 1));
    expect(state.isLoading).toBe(true);
    expect(state.orderData).toBe(null);
    expect(state.error).toBe(null);

    state = reducer(
      initialState,
      getOrderByNumber.rejected(new Error('error'), 'rejected', 1)
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderData).toBe(null);
    expect(state.error).toBe('error');

    state = reducer(
      state,
      getOrderByNumber.fulfilled(mockOrderResponse, 'fulfilled', 1)
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBe(null);
  });
})