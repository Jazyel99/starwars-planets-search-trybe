import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';

export default function Filter() {
  const {
    filterByNumericValues,
    // planets,
    setFilterByNumericValues,
    columnFilterSelector,
    setColumnFilterSelector,
    getFilterByNumericValues,
  } = useContext(PlanetsContext);

  const { filterByNumericValues: numericValues } = filterByNumericValues;

  const selectorColumnValues = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const handleClick = (event) => {
    const li = event.target.parentNode;
    const selectColumnValue = li.getAttribute('data');

    const newFilterByNumericValues = numericValues
      .filter((filterByNumericValue) => filterByNumericValue.column
      !== selectColumnValue);

    setFilterByNumericValues({ filterByNumericValues: [...newFilterByNumericValues] });

    const selectColumns = selectorColumnValues
      .filter((selectColumn) => [...columnFilterSelector,
        selectColumnValue].includes(selectColumn));
    setColumnFilterSelector(selectColumns);
  };

  const handleClickRemoveAllFilters = () => {
    setFilterByNumericValues({ filterByNumericValues: [] });
    setColumnFilterSelector(selectorColumnValues);
  };

  useEffect(() => {
    getFilterByNumericValues();
  }, [filterByNumericValues, getFilterByNumericValues]);

  return (
    <div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleClickRemoveAllFilters }
      >
        Remover Filtros
      </button>
      <ul>
        {
          numericValues.map((value, idx) => (
            <li
              key={ idx }
              data={ value.column }
              data-testid="filter"
            >
              { value.column }
              { value.comparison }
              { value.value }
              <button
                type="button"
                onClick={ handleClick }
              >
                x
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
