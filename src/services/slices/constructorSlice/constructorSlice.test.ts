import constructorSlice, {
  addIngredientToConstructor,
  ingredientMoveDown,
  ingredientMoveUp,
  removeIngredientFromConstructorById,
  initialState
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('Тесты для constructorSlice', () => {
  describe('Тест экшена addIngredientToConstructor', () => {
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ]
      }
    };

    test('Добавление булки в constructorItems', () => {
      const newState = constructorSlice(
        initialState,
        addIngredientToConstructor({
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResult.constructorItems.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });

    test('Добавление ингредиента в constructorItems', () => {
      const newState = constructorSlice(
        initialState,
        addIngredientToConstructor({
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        })
      );

      const ingredient = newState.constructorItems.ingredients[0];
      const expectedIngredient = expectedResult.constructorItems.ingredients[0];

      expect(ingredient).toEqual({
        ...expectedIngredient,
        id: expect.any(String)
      });
    });

    test('Замена булки', () => {
      const initialStateWithBun = {
        constructorItems: {
          bun: {
            id: '1',
            _id: '643d69a5c3f7b9001cfa093c',
            name: 'Краторная булка N-200i',
            type: 'bun',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          },
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        isLoading: false,
        error: null
      };
      const expectedResultForBuns = {
        ...initialStateWithBun,
        constructorItems: {
          bun: {
            _id: '643d69a5c3f7b9001cfa093d',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png'
          },
          ingredients: []
        }
      };
      const newState = constructorSlice(
        initialStateWithBun,
        addIngredientToConstructor({
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        })
      );

      const bun = newState.constructorItems.bun;
      const expectedBun = expectedResultForBuns.constructorItems.bun;

      expect(bun).toEqual({
        ...expectedBun,
        id: expect.any(String)
      });
    });
  });

  describe('Тест экшенов ingredientMoveUp и ingredientMoveDown', () => {
    const initialState = {
      constructorItems: {
        bun: {
          id: '1',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: '1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: '2',
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          },
          {
            id: '3',
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: {
          id: '1',
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        ingredients: [
          {
            id: '1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          },
          {
            id: '3',
            _id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-02-large.png'
          },
          {
            id: '2',
            _id: '643d69a5c3f7b9001cfa093e',
            name: 'Филе Люминесцентного тетраодонтимформа',
            type: 'main',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/meat-03.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png'
          }
        ]
      }
    };

    test('Перемещение вверх', () => {
      const newState = constructorSlice(initialState, ingredientMoveUp('3'));

      const received = newState.constructorItems.ingredients;
      const expected = expectedResult.constructorItems.ingredients;

      expect(received).toEqual(expected);
    });
    test('Перемещение вниз', () => {
      const newState = constructorSlice(initialState, ingredientMoveDown('2'));

      const received = newState.constructorItems.ingredients;
      const expected = expectedResult.constructorItems.ingredients;

      expect(expected).toEqual(received);
    });
  });

  describe('Тест экшена removeIngredientFromConstructorById', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          {
            id: '1',
            _id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png'
          }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      isLoading: false,
      error: null
    };
    const expectedResult = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: []
      }
    };

    test('Удаление ингредиента из constructorItems', () => {
      const newState = constructorSlice(
        initialState,
        removeIngredientFromConstructorById('1')
      );

      const received = newState.constructorItems.ingredients;
      const expected = expectedResult.constructorItems.ingredients;

      expect(expected).toEqual(received);
    });
  });
});
