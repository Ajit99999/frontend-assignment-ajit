import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "../DataTable";

const mockColumns = [
  { accessor: "sno", Header: "S.No" },
  { accessor: "amtPledged", Header: "Amount Pledged" },
  { accessor: "percentageFunded", Header: "Percentage Funded" },
];

const mockPaginationData = {
  paginatedData: [
    { sno: 1, amtPledged: "$100", percentageFunded: "NY" },
    { sno: 2, amtPledged: "$200", percentageFunded: "CA" },
  ],
  currentPage: 2,
  totalPages: 4,
  nextPage: jest.fn(),
  prevPage: jest.fn(),
};

describe("DataTable Component", () => {
  test("renders without crashing", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("displays the table caption", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    const caption = screen.getByText("Funding Project Data");
    expect(caption).toBeInTheDocument();
  });

  test("renders table headers correctly", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    mockColumns.forEach((column) => {
      expect(screen.getByText(column.Header)).toBeInTheDocument();
    });
  });

  test("renders the correct number of rows", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(mockPaginationData.paginatedData.length + 1); 
  });

  test("calls the nextPage function on clicking 'Next' button", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockPaginationData.nextPage).toHaveBeenCalled();
  });

  test("calls the prevPage function on clicking 'Previous' button", () => {
    render(<DataTable columns={mockColumns} paginationData={mockPaginationData} />);
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(mockPaginationData.prevPage).toHaveBeenCalled();
  });
});
