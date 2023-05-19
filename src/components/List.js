import PropTypes from "prop-types";

import logo from "../giphy.webp";

import { Pagination } from "./Pagination";

export const List = ({
  data,
  columns,
  total,
  onPageChange,
  currentPage,
  rowsPerPage,
  handleSelectChange,
  isLoading
}) => {
  const renderedHeaders = columns.map((column) => (
    <th className="px-4 py-2 border-b-2" key={column.keyName}>
      {column.value}
    </th>
  ));

  const renderedItems = data?.map((item, index) => (
      <tr key={index}>
        {columns.map((column, index) => (
            <td
              className="px-4 py-2 break-words"
              key={`${index} - ${item[column.keyName]}`}
            >
              {item[column.keyName]}
            </td>
          ))}
      </tr>
    ));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={logo} alt="loading..." />
      </div>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedItems}</tbody>
      </table>
      <Pagination
        total={total}
        onPageChange={onPageChange}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

List.defaultProps = {
  data: [],
  columns: [],
  total: 0,
  onPageChange: () => {},
  currentPage: 1,
  rowsPerPage: 10,
  handleSelectChange: () => {},
  isLoading: false,
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      keyName: PropTypes.string,
    })
  ),
  total: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleSelectChange: PropTypes.func,
  isLoading: PropTypes.bool
};
