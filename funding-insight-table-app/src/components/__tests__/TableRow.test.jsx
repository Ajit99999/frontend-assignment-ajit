
import { render, screen } from '@testing-library/react';
import TableRow from '../TableRow';
import React from 'react';
describe('TableRow Component', () => {
  const columns = [
    { accessor: 's.no', Header: 'S.No.' },
    { accessor: 'percentage.funded', Header: 'Percentage Funded' },
    { accessor: 'amt.pledged', Header: 'Amount Pledged' },
  ];

  const row = {
    's.no': 13,
    'percentage.funded': 123,
    'amt.pledged': 234,
  };

  test('renders a single row with correct data', () => {
    render(
      <table>
        <tbody>
          <TableRow row={row} columns={columns} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(columns.length); 

    expect(cells[0]).toHaveTextContent('13'); 
    expect(cells[1]).toHaveTextContent('123'); 
    expect(cells[2]).toHaveTextContent('234');
  });

  test('renders with correct column headers', () => {
    render(
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor} scope="col">
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRow row={row} columns={columns} />
        </tbody>
      </table>
    );

    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();
  });

  test('correctly maps data to columns', () => {
    render(
      <table>
        <tbody>
          <TableRow row={row} columns={columns} />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent(row['s.no'].toString());
    expect(cells[1]).toHaveTextContent(row['percentage.funded'].toString());
    expect(cells[2]).toHaveTextContent(row['amt.pledged'].toString());
  });
});
