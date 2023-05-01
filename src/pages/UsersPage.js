import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { List } from "../components/List";
import { SearchBar } from "../components/Search";

export const UsersPage = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("username");
  const columnNames = [
    { value: "User ID", keyName: "id" },
    { value: "Name", keyName: "name" },
    { value: "Username", keyName: "username" },
  ];

  const debounce = (func, timeout = 1000) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedSearch = useCallback(
    debounce((query) => setSearchParams(query)),
    []
  );

  const fetchData = async (queryString = "") => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users${queryString}`
    );

    const usersData = await response.json();
    setData(usersData);
  };

  useEffect(() => {
    fetchData(queryParam ? `?username=${queryParam}` : "");
  }, [queryParam]);

  const handleChange = (event) => {
    const targetValue = event.target.value;

    setInputValue(targetValue);
    delayedSearch({ username: targetValue });
  };

  return (
    <div>
      <SearchBar handleChange={handleChange} inputValue={inputValue} />
      <List data={data} columns={columnNames} />
    </div>
  );
};
