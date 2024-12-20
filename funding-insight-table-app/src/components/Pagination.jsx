import React from "react";
import '../components/Pagination.css';
const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => (
  <div className="pagination" role="navigation" aria-live="polite">
    <button
      className="pagination-button"
      onClick={prevPage}
      disabled={currentPage === 1}
      aria-label="Previous page"
      aria-disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="pagination-info" aria-live="polite">
      Page {currentPage} of {totalPages}
    </span>
    <button
      className="pagination-button"
      onClick={nextPage}
      disabled={currentPage === totalPages}
      aria-label="Next page"
      aria-disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
