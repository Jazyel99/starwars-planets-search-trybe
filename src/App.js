import React from 'react';
import FilterByNumericValues from './components/FilterByNumericValues';
import InputSearch from './components/InputSearch';
import Table from './components/Table';
import PlanetsProvider from './context/planetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <InputSearch />
        <FilterByNumericValues />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
