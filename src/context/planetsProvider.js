import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './planetsContext';
import getPlanetsAPI from '../services/api';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filterByName, setFilterByName] = useState({});
  const [columnFilterSelector, setColumnFilterSelector] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [comparisonFilterSelector, setComparisonFilterSelector] = useState([
    'maior que', 'menor que', 'igual a']);
  const [filterByNumericValues,
    setFilterByNumericValues] = useState({ filterByNumericValues: [] });

  const getPlanets = useCallback(async () => {
    setIsFetching(true);
    const reponsePlanets = await getPlanetsAPI();
    setPlanets(reponsePlanets.results);
    setIsFetching(false);
  }, []);

  const getFilterByName = useCallback((value = '') => {
    setFilterByName({ filterByName: { name: value } });
    if (planets.length > 0 && value.length > 0) {
      const planetsFilter = planets.filter((planet) => planet.name.includes(value));
      setPlanets(planetsFilter);
    } else {
      getPlanets();
    }
  }, [planets, getPlanets]);

  const getFilterByNumericValues = useCallback(async () => {
    let filteredPlanets = planets;
    if ((filterByNumericValues.filterByNumericValues).length > 0) {
      const filterObject = filterByNumericValues
        .filterByNumericValues;
      filterObject.forEach((filterColumn) => {
        filteredPlanets = filteredPlanets.filter((planet) => {
          if (filterColumn.comparison === 'maior que') {
            return +planet[filterColumn.column] > +filterColumn.value;
          }
          if (filterColumn.comparison === 'menor que') {
            return +planet[filterColumn.column] < +filterColumn.value;
          }
          if (filterColumn.comparison === 'igual a') {
            return planet[filterColumn.column] === filterColumn.value;
          }
          return planet;
        });
        setPlanets(filteredPlanets);
      });
    }
  }, [planets, setPlanets,
    filterByNumericValues.filterByNumericValues]);

  const data = {
    isFetching,
    planets,
    filterByName,
    columnFilterSelector,
    comparisonFilterSelector,
    filterByNumericValues,
    getFilterByNumericValues,
    setFilterByNumericValues,
    setColumnFilterSelector,
    setComparisonFilterSelector,
    getFilterByName,
    getPlanets,
  };

  return (
    <PlanetsContext.Provider value={ data }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
