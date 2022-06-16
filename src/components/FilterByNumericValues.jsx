import React, { useContext, useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import PlanetsContext from '../context/planetsContext';

export default function FilterByNumericValues() {
  const [columnSelector, setColumn] = useState('');

  const columnRef = useRef(null);
  const comparisonRef = useRef(null);
  const valueRef = useRef(null);

  const {
    // comparisonFilterSelector,
    setFilterByNumericValues,
    setColumnFilterSelector,
    filterByNumericValues,
    columnFilterSelector,
    getFilterByNumericValues,
  } = useContext(PlanetsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { column: columnRef.current.value,
      comparison: comparisonRef.current.value,
      value: valueRef.current.value || 0 };
    setColumn(columnRef.current.value);
    setFilterByNumericValues({ filterByNumericValues: [...filterByNumericValues
      .filterByNumericValues, data] });
  };

  useEffect(() => {
    const newColumn = columnFilterSelector
      .filter((column) => column !== columnSelector);
    if (columnSelector !== '') {
      setColumnFilterSelector(newColumn);
      getFilterByNumericValues();
    }
    setColumn('');
  }, [columnFilterSelector, columnSelector, filterByNumericValues,
    setColumnFilterSelector, getFilterByNumericValues]);
  return (
    <div>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            data-testid="column-filter"
            id="column"
            ref={ columnRef }
          >
            {
              columnFilterSelector.map((column, idx) => (
                <option
                  key={ idx }
                  value={ column }
                >
                  {column}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          Operador
          <select
            name="comparison"
            ref={ comparisonRef }
            data-testid="comparison-filter"
            id="comparison"
          >
            <option
              selected
              value="maior que"
            >
              maior que
            </option>
            <option
              value="menor que"
            >
              menor que
            </option>
            <option
              value="igual a"
            >
              igual a
            </option>
          </select>
        </label>

        <input
          name="value"
          type="number"
          defaultValue="0"
          ref={ valueRef }
          data-testid="value-filter"
        />

        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>

      <div>
        <Filter />
      </div>
    </div>
  );
}
