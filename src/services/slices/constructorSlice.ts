import { orderBurgerApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction,
  createSelector
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

export interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'user/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const moveIngredient = (
  ingredients: TConstructorIngredient[],
  from: number,
  to: number
) => {
  const [part] = ingredients.splice(from, 1);
  ingredients.splice(to, 0, part);
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredientToConstructor: {
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...item } };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
        console.log(state.constructorItems.ingredients);
      }
    },

    removeIngredientFromConstructorById: (state, { payload }) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== payload
        );
    },

    ingredientMoveUp: (state, { payload }) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === payload
      );
      if (currentIndex != 0) {
        moveIngredient(
          state.constructorItems.ingredients,
          currentIndex,
          currentIndex - 1
        );
      }
    },

    ingredientMoveDown: (state, { payload }) => {
      const currentIndex = state.constructorItems.ingredients.findIndex(
        (item) => item.id === payload
      );
      if (currentIndex != state.constructorItems.ingredients.length) {
        moveIngredient(
          state.constructorItems.ingredients,
          currentIndex,
          currentIndex + 1
        );
      }
    },

    resetModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.orderRequest = true;
    });
    builder.addCase(orderBurger.rejected, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = action.error.message as string;
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.error = null;
      state.orderModalData = action.payload.order;
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  }
});

const constructorSliceSelectors = (state: RootState): ConstructorState =>
  state.constructorData;

export const getConstructorState = createSelector(
  [constructorSliceSelectors],
  (state) => ({
    ingredients: state.constructorItems.ingredients,
    bun: state.constructorItems.bun
  })
);
export const {
  addIngredientToConstructor,
  resetModal,
  ingredientMoveUp,
  ingredientMoveDown,
  removeIngredientFromConstructorById
} = constructorSlice.actions;

export const getOrderRequest = (state: RootState) =>
  state.constructorData.orderRequest;
export const getOrderModalData = (state: RootState) =>
  state.constructorData.orderModalData;

export default constructorSlice.reducer;
