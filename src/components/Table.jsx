import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/planetsContext';
import TableRow from './TableRow';

export default function Table() {
  const {
    planets,
    getPlanets,
  } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface  Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {
          planets.length > 0 && planets.map((planet, idx) => (
            <TableRow
              key={ idx }
              planet={ planet }
            />
          ))
        }
      </tbody>
    </table>
  );
}
