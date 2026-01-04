import reducer, { initialState, getIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';
import { describe, test } from '@jest/globals';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('Тесты для ingredientsSlice', () => {
  const expectedResult = mockIngredients;

  test('Тест состояния загрузи ингредиентов', async () => {
    const state = reducer(initialState, getIngredients.pending('pending'));
    expect(state.isLoading).toBe(true);
  });

  test('Тест сообщения ошибки при получении ингредиентов', async () => {
    const state = reducer(
      initialState,
      getIngredients.rejected(new Error('error'), 'rejected')
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });

  test('Тест успешного получения ингредиентов', async () => {
    const state = reducer(
      initialState,
      getIngredients.fulfilled(expectedResult, 'fulfilled')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(expectedResult);
  });

  
});
