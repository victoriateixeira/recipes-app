import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithRouter from '../renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import { nullInprogress } from './mocks/LocalStorege';

jest.mock('clipboard-copy');

describe('Testes para página RecipeDetails', () => {
  it('verifique a pagina em progresso de comida', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(
        () => Promise.resolve({ json: () => Promise.resolve(oneMeal),
        }),
      );
    await act(async () => {
      renderWithRouter(
        <RecipeInProgress />,
        '/meals',
      );
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const btnFavorite = screen.getByTestId('favorite-btn');
    act(() => {
      userEvent.click(btnFavorite);
    });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    expect(btnFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(screen.getAllByRole('img')[1]);
    });

    const btnShare = screen.getByTestId('share-btn');
    act(() => {
      userEvent.click(btnShare);
    });

    await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());

    const checkbox = screen.getAllByRole('checkbox');

    checkbox.forEach((box) => {
      userEvent.click(box);
      expect(box).toBeChecked();
    });

    const btnFinsh = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinsh);
    // checkbox.forEach((box) => {
    //   userEvent.click(box);
    //   expect(box).not.toBeChecked();
    // });
  });
  it('verifique a pagina em progresso de bebidas', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(nullInprogress));
    global.fetch = jest.fn()
      .mockImplementation(
        () => Promise.resolve({ json: () => Promise.resolve(oneDrink),
        }),
      );
    await act(async () => {
      renderWithRouter(
        <RecipeInProgress />,
        '/drinks',
      );
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const checkbox = screen.getAllByRole('checkbox');

    checkbox.forEach((box) => {
      userEvent.click(box);
      expect(box).toBeChecked();
    });

    const btnFinsh = screen.getByTestId('finish-recipe-btn');
    userEvent.click(btnFinsh);
  });
  it('verifique o checked', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(
        () => Promise.resolve({ json: () => Promise.resolve(oneMeal),
        }),
      );
    await act(async () => {
      renderWithRouter(<RecipeInProgress />, '/meals');
    });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const checkbox = screen.getAllByRole('checkbox');

    checkbox.forEach((box) => {
      userEvent.click(box);
      expect(box).toBeChecked();
    });

    checkbox.forEach((box) => {
      userEvent.click(box);
      expect(box).not.toBeChecked();
    });
  });
});
