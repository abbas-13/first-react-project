import PropTypes from "prop-types";

export const SearchBar = ({ handleChange, inputValue, placeholder }) => (
  <input
    onChange={handleChange}
    className="rounded-lg border mx-3.5 p-1 w-64"
    placeholder={placeholder}
    value={inputValue}
  />
);

SearchBar.defaultProps = {
  handleChange: () => {},
  placeholder: "Search",
  inputValue: "",
};

SearchBar.propTypes = {
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  inputValue: PropTypes.string,
};
