import React from 'react';
import { useHistory } from 'react-router-dom';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

export default function Recipes() {
  // const url = window.location.pathname;
  const { location: { pathname } } = useHistory();
  const isDrink = pathname.includes('drinks');
  return (
    <div>
      <h1>Recipes</h1>
      {isDrink ? <Drinks /> : <Meals />}
    </div>
  );
}
