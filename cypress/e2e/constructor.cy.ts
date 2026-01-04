const bun1 = '[data-cy="1"]';
const bun2 = '[data-cy="8"]';
const main = '[data-cy="2"]';
const sauce = '[data-cy="4"]';
const submitOrderButton = '[data-cy="order-button"]';
const constructor = '[data-cy="burgerConstructor"]';
const modal = '[data-cy="modal"]';
const modalClose = '[data-cy="modalClose"]';
const modalOverlay = '[data-cy="modalOverlay"]';
const submitOrderNumber = '[data-cy="order-number"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('login');
  cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  window.localStorage.setItem(
    'TestRefreshToken',
    JSON.stringify('TestRefreshToken')
  );
  cy.setCookie('TestAccessToken', 'TestAccessToken');
  cy.visit('/');
  cy.wait('@getIngredients');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearCookies();
});

const verifyBunIngredients = (
  topBun: string,
  middleMain: string,
  bottomBun: string
) => {
  cy.get(constructor).should('contain', topBun);
  cy.get(constructor).should('contain', middleMain);
  cy.get(constructor).should('contain', bottomBun);
};

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

describe('Добавление ингредиентов', () => {
  it('Проверка счетчика ингредиентов', () => {
    cy.get(main).children('button').click();
    cy.get(main).find('.counter__num').contains('1');
  });

  describe('Выбор булок и начинки', () => {
    it('Добавление булки и начинки', () => {
      cy.get(bun1).children('button').click();
      cy.get(main).children('button').click();
      verifyBunIngredients(
        'Краторная булка N-200i',
        'Биокотлета из марсианской Магнолии',
        'Краторная булка N-200i'
      );
    });

    it('Добавление булки, начинки и соуса', () => {
      cy.get(bun1).children('button').click();
      cy.get(main).children('button').click();
      cy.get(sauce).children('button').click();
      cy.get(constructor).should('contain', 'Соус Spicy-X');
      verifyBunIngredients(
        'Краторная булка N-200i',
        'Биокотлета из марсианской Магнолии',
        'Краторная булка N-200i'
      );
    });

    it('Добавление булки после добавления начинки', () => {
      cy.get(main).children('button').click();
      cy.get(bun1).children('button').click();
      verifyBunIngredients(
        'Краторная булка N-200i',
        'Биокотлета из марсианской Магнолии',
        'Краторная булка N-200i'
      );
    });

    describe('Проверка изменения булки', () => {
      it('Замена булки другой булкой без добавления начинки', () => {
        cy.get(bun1).children('button').click();
        verifyBunIngredients(
          'Краторная булка N-200i',
          '',
          'Краторная булка N-200i'
        );
        cy.get(bun2).children('button').click();
        verifyBunIngredients(
          'Флюоресцентная булка R2-D3',
          '',
          'Флюоресцентная булка R2-D3'
        );
      });

      it('Замена булки другой булкой с начинками', () => {
        cy.get(bun1).children('button').click();
        verifyBunIngredients(
          'Краторная булка N-200i',
          '',
          'Краторная булка N-200i'
        );
        cy.get(main).children('button').click();
        cy.get(bun2).children('button').click();
        verifyBunIngredients(
          'Флюоресцентная булка R2-D3',
          'Биокотлета из марсианской Магнолии',
          'Флюоресцентная булка R2-D3'
        );
      });
    });
  });

  describe('Проверка работы модальных окон', () => {
    it('Открытие модального окна', () => {
      cy.get(bun1).click();
      cy.get(modal).should('be.visible');
    });
    it('Закрытие модального окна по клику на оверлей', () => {
      cy.get(bun2).click();
      cy.get(modal).should('be.visible');
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
    });
    it('Закрытие модального окна по клику на кнопку', () => {
      cy.get(main).click();
      cy.get(modal).should('be.visible');
      cy.get(modalClose).click();
      cy.get(modal).should('not.exist');
    });
  });

  describe('Проверка создания заказа', () => {
    it('проверка очистки конструктора после создания заказа', () => {
      cy.get(bun1).children('button').click();
      cy.get(main).children('button').click();
      verifyBunIngredients(
        'Краторная булка N-200i',
        'Биокотлета из марсианской Магнолии',
        'Краторная булка N-200i'
      );

      cy.get(submitOrderButton).click();
      cy.get(modal).should('be.visible');
      cy.get(submitOrderNumber).should('contain', '1');
      cy.get(modalClose).click();
      cy.get(modal).should('not.exist');
      cy.get(constructor).should('exist');
      cy.get(constructor).should(
        'not.contain',
        'Краторная булка N-200i'
      );
      cy.get(constructor).should(
        'not.contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });
});
