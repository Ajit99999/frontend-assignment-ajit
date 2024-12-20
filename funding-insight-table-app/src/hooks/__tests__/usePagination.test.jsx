import { render, screen, fireEvent } from '@testing-library/react';
import usePagination from '../usePagination';
import React from 'react';
// Mocking the hook with a test component
const TestComponent = ({ data, itemsPerPage }) => {
  const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(data, itemsPerPage);

  return (
    <div>
      <div>Current Page: {currentPage}</div>
      <div>Total Pages: {totalPages}</div>
      <div>Paginated Data: {JSON.stringify(paginatedData)}</div>
      <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
      <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

describe('usePagination Hook', () => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
    { id: 6, name: 'Item 6' },
    { id: 7, name: 'Item 7' },
    { id: 8, name: 'Item 8' },
  ];

  test('should show initial pagination state', () => {
    render(<TestComponent data={data} itemsPerPage={3} />);

    // Initial state: current page should be 1, total pages should be 3, paginated data should show first 3 items
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    expect(screen.getByText('Total Pages: 3')).toBeInTheDocument();
    expect(screen.getByText('Paginated Data: [{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"},{"id":3,"name":"Item 3"}]')).toBeInTheDocument();
  });

  test('should go to the next page when clicking next', () => {
    render(<TestComponent data={data} itemsPerPage={3} />);

    // Click the "Next" button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Check that the current page changes to 2 and new data is displayed
    expect(screen.getByText('Current Page: 2')).toBeInTheDocument();
    expect(screen.getByText('Paginated Data: [{"id":4,"name":"Item 4"},{"id":5,"name":"Item 5"},{"id":6,"name":"Item 6"}]')).toBeInTheDocument();
  });

  test('should go to the previous page when clicking previous', () => {
    render(<TestComponent data={data} itemsPerPage={3} />);

    // Go to the second page first
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Click the "Previous" button
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);

    // Check that the current page changes back to 1
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    expect(screen.getByText('Paginated Data: [{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"},{"id":3,"name":"Item 3"}]')).toBeInTheDocument();
  });

  test('should not go to a page higher than the total number of pages', () => {
    render(<TestComponent data={data} itemsPerPage={3} />);

    // Try to go beyond the last page
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    fireEvent.click(nextButton); // Should remain on the last page (page 3)

    // Check that the current page is 3 (last page) and Next button is disabled
    expect(screen.getByText('Current Page: 3')).toBeInTheDocument();
    expect(screen.getByText('Paginated Data: [{"id":7,"name":"Item 7"},{"id":8,"name":"Item 8"}]')).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('should not go to a page lower than 1', () => {
    render(<TestComponent data={data} itemsPerPage={3} />);

    // Try to go to a negative page
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton); // Should remain on page 1

    // Check that the current page is 1 and Previous button is disabled
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });
});
