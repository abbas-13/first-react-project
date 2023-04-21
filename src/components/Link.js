import { useState } from "react";

function Link({ to, children }) {
  const [currentPath, setCurrentPath] = useState(window.location);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };

  const handleClick = (event) => {
    event.preventDefault();

    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
