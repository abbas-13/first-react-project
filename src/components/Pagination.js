export const Pagination = ({ total, currentPage, onPageChange }) => {
  const pageNumbers = [1];

  for (let i = 2; i <= Math.ceil(total / 10); i++) {
    pageNumbers.push(i);
  }

  const previousPage = "<";
  const nextPage = ">";

  const classNames = "px-2 py-2 flex border";

  return (
    <nav className="flex items-baseline py-8 justify-center">
      {previousPage}
      <ul className="flex gap-4 px-4 justify-center">
        {pageNumbers.map((number) => (
          <li
            onClick={() => onPageChange(number)}
            className={classNames}
            style={
              currentPage === number
                ? { borderColor: "red" }
                : { borderColor: "blue" }
            }
            key={number}
          >
            {number}
          </li>
        ))}
      </ul>
      {nextPage}
    </nav>
  );
};
