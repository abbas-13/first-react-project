import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { uniq } from "lodash-es";

export const Pagination = ({
  total,
  currentPage,
  onPageChange,
  rowsPerPage,
  onLimitUpdate,
}) => {
  const [pagesToShow, setPagesToShow] = useState([1]);

  const lastPage = total ? Math.ceil(total / rowsPerPage) : 1;

  const getPagesToShow = () => {
    if (lastPage === 1) {
      setPagesToShow([1]);
    } else {
      const tempNumbers = [1, lastPage];

      const nextPageValue = currentPage === 1 ? currentPage + 1 : 0;
      const previousPageValue = currentPage - 1;
      const secondLastValue = currentPage + 1 < lastPage ? currentPage + 1 : 0;
      const fifthValue = currentPage === lastPage ? currentPage - 2 : 0;

      tempNumbers.push(
        nextPageValue < 1 ? 0 : nextPageValue,
        previousPageValue < 1 ? 0 : previousPageValue,
        currentPage > lastPage ? 0 : currentPage,
        secondLastValue > lastPage ? 0 : secondLastValue,
        fifthValue > lastPage ? 0 : fifthValue
      );

      const sortedArray = tempNumbers.sort((a, b) => a - b);
      const uniqueArray = uniq(sortedArray);

      if (uniqueArray.length > 1) {
        uniqueArray.shift();
      }

      if (currentPage > 3) {
        uniqueArray.splice(1, 0, "...");
      }

      if (currentPage < lastPage - 2) {
        uniqueArray.splice(uniqueArray.length - 1, 0, "...");
      }

      setPagesToShow(uniqueArray);
    }
  };

  useEffect(() => {
    getPagesToShow();
  }, [currentPage, rowsPerPage]);

  return (
    <div className="flex items-baseline my-8 justify-center">
      <nav className="flex items-baseline justify-center">
        <button
          onClick={() => {
            if (currentPage - 1 !== 0) {
              onPageChange(currentPage - 1);
            }
          }}
          className="cursor-pointer"
        >
          Previous
        </button>
        <ul className="flex gap-4 mx-4 justify-center">
          {pagesToShow.map((number, index) => (
            <li
              onClick={() => {
                if (typeof number === "number") {
                  onPageChange(number);
                }
              }}
              className="px-2 py-2 flex border cursor-pointer"
              style={
                currentPage === number
                  ? { borderColor: "red" }
                  : { borderColor: "blue" }
              }
              key={index}
            >
              {number}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            if (currentPage + 1 !== lastPage + 1) {
              onPageChange(currentPage + 1);
            }
          }}
          className="cursor-pointer"
        >
          Next
        </button>
      </nav>
      <div>
        <select
          className="flex ml-4 p-2"
          onChange={onLimitUpdate}
          value={rowsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  total: 0,
  currentPage: 1,
  onPageChange: () => {},
  rowsPerPage: 10,
  onLimitUpdate: () => {},
};

Pagination.propTypes = {
  total: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  rowsPerPage: PropTypes.number,
  onLimitUpdate: PropTypes.func,
};
