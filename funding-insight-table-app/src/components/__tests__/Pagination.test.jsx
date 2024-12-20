import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  let mockPrevPage;
  let mockNextPage;

  beforeEach(() => {
    mockPrevPage = jest.fn();
    mockNextPage = jest.fn();
  });

  test('renders pagination buttons and information', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  test('calls prevPage when "Previous" button is clicked', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );

    const prevButton = screen.getByText('Previous');
    
    fireEvent.click(prevButton);
    expect(mockPrevPage).toHaveBeenCalled();
  });

  test('calls nextPage when "Next" button is clicked', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );

    const nextButton = screen.getByText('Next');
    
    fireEvent.click(nextButton);
    expect(mockNextPage).toHaveBeenCalled();
  });

  test('disables "Previous" button when currentPage is 1', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  test('disables "Next" button when currentPage is the last page', () => {
    render(
      <Pagination 
        currentPage={5} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('enables both buttons when currentPage is between 1 and totalPages', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        nextPage={mockNextPage} 
        prevPage={mockPrevPage} 
      />
    );

    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
