import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHeader from '../TableHeader';

describe('TableHeader Component', () => {
  const columns = [
    { accessor: 's.no', Header: 'S.No.' },
    { accessor: 'percentage.funded', Header: 'Percentage Funded' },
    { accessor: 'amt.pledged', Header: 'Amount Pledged' },
  ];

  test('renders the correct number of <th> elements based on columns', () => {
    render(<TableHeader columns={columns} />);
    
    const thElements = screen.getAllByRole('columnheader');
    expect(thElements).toHaveLength(columns.length);
  });

  test('displays the correct header values for each column', () => {
    render(<TableHeader columns={columns} />);
    
    columns.forEach((column) => {
      expect(screen.getByText(column.Header)).toBeInTheDocument();
    });
  });

  test('sets the correct "aria-sort" attribute on the <th> elements', () => {
    render(<TableHeader columns={columns} />);
    
    const thElements = screen.getAllByRole('columnheader');
    thElements.forEach((th) => {
      expect(th).toHaveAttribute('aria-sort', 'none');
    });
  });

  test('renders nothing when columns prop is an empty array', () => {
    render(<TableHeader columns={[]} />);
    
    const thElements = screen.queryAllByRole('columnheader');
    expect(thElements).toHaveLength(0);
  });

  test('renders correctly when there is only one column', () => {
    const singleColumn = [ { accessor: 's.no', Header: 'S.No.' }];
    render(<TableHeader columns={singleColumn} />);
    
    const thElements = screen.getAllByRole('columnheader');
    expect(thElements).toHaveLength(1);
    expect(screen.getByText('S.No.')).toBeInTheDocument();
  });
});
