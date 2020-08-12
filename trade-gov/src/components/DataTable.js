import React from 'react';
import { Cell, Column, Table } from '@blueprintjs/table';
import _ from 'lodash';
import '@blueprintjs/table/lib/css/table.css';

export function DataTable({ data = [] }) {
  const cellRenderer = (property, rowIndex) => {
    const d = _.get(data, [rowIndex, property]);
    return <Cell>{_.isArray(d) ? _.first(d) : d}</Cell>
  };

  return (
    <Table numRows={data.length} columnWidths={[300, 150, 150, 775]}>
      <Column name="Name"
              cellRenderer={_.partial(cellRenderer, 'title')} />
      <Column name="Industry"
              cellRenderer={_.partial(cellRenderer, 'industry')} />
      <Column name="Location"
              cellRenderer={_.partial(cellRenderer, 'specific_location')} />
      <Column name="Description"
              cellRenderer={_.partial(cellRenderer, 'description')}
              className="description-column" />
    </Table>
  );
}

export default DataTable;
