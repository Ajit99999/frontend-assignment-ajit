import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import "../components/DataTable.css";
const DataTable = ({ columns, paginationData }) => {
  const { paginatedData, currentPage, totalPages, nextPage, prevPage } =
    paginationData;

  return (
    <div className="data-table-container">
      <table
        className="data-table"
        role="table"
        aria-labelledby="table-caption"
      >
        <caption id="table-caption">
          <div id="table-container">
            <h4>Funding Project Data</h4>
          </div>
        </caption>
        <TableHeader columns={columns} />
        <tbody>
          {paginatedData.map((row, index) => (
            <TableRow key={index} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default DataTable;
