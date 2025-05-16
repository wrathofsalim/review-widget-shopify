import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
        <div className="pagination">
            <button
                className={`pagination-left-button ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <svg class="flipped" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 6.78467H17.3" stroke="#1F221F" stroke-width="0.8" />
                    <path d="M10.1407 12.6219C10.1407 12.6219 12.4316 6.78473 17.1936 6.78473C12.43 6.78473 10.1407 0.94751 10.1407 0.94751" stroke="#1F221F" stroke-width="0.8" />
                </svg>
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`pagination-page-number ${page === currentPage ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`pagination-right-button ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 6.78467H17.3" stroke="#1F221F" stroke-width="0.8" />
                    <path d="M10.1407 12.6219C10.1407 12.6219 12.4316 6.78473 17.1936 6.78473C12.43 6.78473 10.1407 0.94751 10.1407 0.94751" stroke="#1F221F" stroke-width="0.8" />
                </svg>

            </button>
        </div>
    );
};

export default Pagination;