import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../../store';

export const getIngredients = createAsyncThunk('/ingredients', () =>
  getIngredientsApi()
);

export interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  error: string | null;
}

export const initialState: IngredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getIngredients.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredients = payload;
    });
  }
});

export const getIngredientsState = (state: RootState): IngredientsState =>
  state.ingredientsData;

export default ingredientsSlice.reducer;
