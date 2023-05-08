import { Pagination } from "./Pagination";

import logo from "../giphy.webp";

export const List = ({
  data,
  columns,
  total,
  onPageChange,
  currentPage,
  rowsPerPage,
  handleSelectChange,
  isLoading,
}) => {
  const renderedHeaders = columns.map((column) => {
    return (
      <th className="px-4 py-2 border-b-2" key={column.keyName}>
        {column.value}
      </th>
    );
  });

  const renderedItems = data?.map((item, index) => {
    return (
      <tr key={index}>
        {columns.map((column, index) => {
          return (
            <td
              className="px-4 py-2 break-words"
              key={`${index} - ${item[column.keyName]}`}
            >
              {item[column.keyName]}
            </td>
          );
        })}
      </tr>
    );
  });

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
