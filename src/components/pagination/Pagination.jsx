import React from "react";
import "../../styles/pagination.css";

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? "active" : ""}`}
            >
              <div className="pagination-numbers">{number}</div>
            </button>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
