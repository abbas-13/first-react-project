import { Pagination } from "./Pagination";

export const List = ({ total, data, columns, onPageChange, currentPage }) => {
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
              className="px-4 py-2"
              key={`${index} - ${item[column.keyName]}`}
            >
              {item[column.keyName]}
            </td>
          );
        })}
      </tr>
    );
  });

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
      />
    </div>
  );
};
