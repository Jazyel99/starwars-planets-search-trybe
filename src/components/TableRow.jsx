import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow(props) {
  const { planet } = props;
  return (
    <tr>
      {
        Object.values(planet).map((column, idx) => <td key={ idx }>{column}</td>)
      }
    </tr>
  );
}

TableRow.propTypes = {
  planet: PropTypes.objectOf(String).isRequired,
};
