import React from "react";
import '../components/TableRow.css';
const TableRow = ({ row, columns }) => (
  <tr className="table-row">
    {columns.map((column) => (
      <td key={column.accessor} aria-labelledby={column.accessor}>
        {row[column.accessor]}
      </td>
    ))}
  </tr>
);

export default TableRow;
