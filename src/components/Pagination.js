import { useEffect, useState } from "react";
import { uniq } from "lodash-es";

export const Pagination = ({
  total,
  currentPage,
  onPageChange,
  nextPage,
  previousPage,
  postsPerPage,
  handleSelectChange,
}) => {
  const [pagesToShow, setPagesToShow] = useState([1]);

  const lastPage = Math.ceil(total / postsPerPage);

  const getPagesToShow = () => {
    if (lastPage === 1) {
      setPagesToShow([1]);
    } else {
      const tempNumbers = [1, lastPage];

      const firstValue = currentPage === 1 ? currentPage + 1 : 0;
      const secondValue = currentPage - 1;
      const thirdValue = currentPage;
      const fourthValue = currentPage + 1 < lastPage ? currentPage + 1 : 0;
      const fifthValue = currentPage === lastPage ? currentPage - 2 : 0;

      tempNumbers.push(
        firstValue < 1 ? 0 : firstValue,
        secondValue < 1 ? 0 : secondValue,
        thirdValue > lastPage ? 0 : thirdValue,
        fourthValue > lastPage ? 0 : fourthValue,
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
  }, [currentPage, postsPerPage]);

  const classNames = "px-2 py-2 flex border cursor-pointer";

  return (
    <div className="flex items-baseline py-8 justify-center">
      <nav className="flex items-baseline py-8 justify-center">
        <button onClick={previousPage} className="cursor-pointer">
          Previous
        </button>
        <ul className="flex gap-4 px-4 justify-center">
          {pagesToShow.map((number, index) => (
            <li
              onClick={() => {
                if (typeof number === "number") {
                  onPageChange(number);
                }
              }}
              className={classNames}
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
        <button onClick={nextPage} className="cursor-pointer">
          Next
        </button>
      </nav>
      <div>
        <select
          className="flex ml-4 p-2"
          onChange={handleSelectChange}
          value={postsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};
