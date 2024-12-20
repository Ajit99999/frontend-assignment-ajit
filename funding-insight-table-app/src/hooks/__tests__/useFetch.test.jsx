import { render, screen, waitFor } from '@testing-library/react';
import useFetch from '../useFetch';

import React from 'react';
global.fetch = jest.fn();

const TestComponent = ({ url }) => {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{JSON.stringify(data)}</div>;
};

describe('useFetch Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle fetch success correctly', async () => {
    const mockData = [{ id: 1, name: 'Test Data' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<TestComponent url="https://api.example.com/data" />);
    await waitFor(() => expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument());

    expect(screen.getByText(JSON.stringify(mockData))).toBeInTheDocument();
  });

  test('should handle fetch error correctly', async () => {
    const errorMessage = 'Network error';
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<TestComponent url="https://api.example.com/data" />);
    await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  test('should handle non-200 HTTP response correctly', async () => {
    const errorMessage = "Failed to fetch the data.";
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    });

    render(<TestComponent url="https://api.example.com/data" />);
    await waitFor(() => expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument());

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
