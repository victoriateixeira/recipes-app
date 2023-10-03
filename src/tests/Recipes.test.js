import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';
import Drinks from '../pages/Drinks';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';

const testEmail = 'trybe@trybe.com';
const testPassoword = '1234567';
// const pushUrl = '/meals';

describe('testa a rota /meals e /drinks', () => {
  it('verifica a rota drinks', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByLabelText(/email:/i);
    userEvent.type(emailInput, testEmail);

    const passInput = screen.getByLabelText(/Passoword:/i);
    userEvent.type(passInput, testPassoword);

    const fetchButton = screen.getByRole('button', { name: /Enter/i });
    userEvent.click(fetchButton);

    const btnDrink = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
  });
  it('verifica a page drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    await waitFor(() => expect(screen.getByTestId('Cocktail-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Cocktail-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Shake-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Other / Unknown-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Other / Unknown-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Cocoa-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Cocoa-category-filter'));
    });
    // await waitFor(() => expect(screen.getByTestId('All-category-filter')).toBeInTheDocument());
    // act(() => {
    //   userEvent.click(screen.getByTestId('All-category-filter'));
    // });
    // act(() => {
    //   userEvent.click(profile);
    // });
  });

  it('verfica a rota meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const profile = 'profile-top-btn';

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    await waitFor(() => expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Beef-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Chicken-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Chicken-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Dessert-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Dessert-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('Goat-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Goat-category-filter'));
    });
    await waitFor(() => expect(screen.getByTestId('All-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('All-category-filter'));
    });
    act(() => {
      userEvent.click(screen.getByTestId(profile));
    });
  });
  it('verificando função fetch', async () => {
    act(() => {
      renderWithRouterAndRedux(<Drinks />);
    });

    global.fetch = jest.fn()
      .mockImplementation(() => Promise
        .resolve({ json: () => Promise.resolve(ordinaryDrinks),
        }));
    // await waitFor(() => expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument());
    act(() => {
      userEvent.click(screen.getByTestId('Ordinary Drink-category-filter'));
    });
    act(() => {
      userEvent.click(screen.getByTestId('Ordinary Drink-category-filter'));
    });
  });
});
