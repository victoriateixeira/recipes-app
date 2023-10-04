import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import AppProvider from './context/AppProvider';
import RecipesProvider from './context/RecipesProvider';

const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <AppProvider>
          <RecipesProvider>
            <Router history={ history }>
              {component}
            </Router>
          </RecipesProvider>
        </AppProvider>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;
