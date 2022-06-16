import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

export default function InputSearch() {
  const {
    getFilterByName,
  } = useContext(PlanetsContext);

  const handleChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    getFilterByName(value);
  };

  return (
    <input
      type="search"
      data-testid="name-filter"
      onChange={ handleChange }
    />
  );
}
