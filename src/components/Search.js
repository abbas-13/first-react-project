export const SearchBar = ({ handleChange, inputValue }) => {
  return (
    <input
      onChange={handleChange}
      className="rounded-lg border mx-3.5 p-1 w-64"
      placeholder="Username"
      value={inputValue}
    />
  );
};
