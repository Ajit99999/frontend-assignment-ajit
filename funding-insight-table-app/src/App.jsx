import React from "react";
import DataTable from "./components/DataTable";
import useFetch from "./hooks/useFetch";
import usePagination from "./hooks/usePagination";
import { API_URL } from "./utill/constant";
import "../src/assets/global.css";
import "./App.css";
function App() {
  const { data, loading, error } = useFetch(API_URL);

  const itemsPerPage = 5;
  const pagination = usePagination(data, itemsPerPage);

  const columns = [
    { accessor: "s.no", Header: "S.No." },
    { accessor: "percentage.funded", Header: "Percentage Funded" },
    { accessor: "amt.pledged", Header: "Amount Pledged" },
  ];

  if (loading) {
    return (
      <div className="container">
        <div data-testid="spinner" className="spinner"></div>
      </div>
    );
  }
  if (error)
    return (
      <div className="container">
        <p>Error: {error}</p>
      </div>
    );

  return <DataTable columns={columns} paginationData={pagination} />;
}

export default App;
