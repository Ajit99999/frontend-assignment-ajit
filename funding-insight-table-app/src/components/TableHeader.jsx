import React from "react";
import '../components/TableHeader.css';
const TableHeader = ({ columns }) => (
  <thead className="table-header">
    <tr>
      {columns.map((column) => (
        <th key={column.accessor} scope="col" aria-sort="none">
          {column.Header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
