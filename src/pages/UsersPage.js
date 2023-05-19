import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { List } from "../components/List";
import { SearchBar } from "../components/Search";

export const UsersPage = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

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

  const delayedSearch = useCallback(
    debounce((query) => setSearchParams(query)),
    []
  );

  const fetchData = async (queryString = "") => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users${queryString}`
      );

      const usersData = await response.json();

      setData(usersData);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(queryParam ? `?username=${queryParam}` : "");
  }, [queryParam]);

  const totalUsers = data?.length;
  const lastPage = totalUsers / usersPerPage;
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = data?.slice(indexOfFirstPost, indexOfLastPost);

  const handleChange = (event) => {
    const targetValue = event.target.value;

    setInputValue(targetValue);
    delayedSearch({ username: targetValue });
  };

  const onPageChange = (number) => {
    if (number >= 1 && number <= lastPage) {
      setCurrentPage(number);
    }
  };

  const handleSelectChange = (event) => {
    setUsersPerPage(event.target.value);
  };

  return (
    <div>
      <SearchBar
        placeholder="Username"
        handleChange={handleChange}
        inputValue={inputValue}
      />
      <List
        data={currentUsers}
        columns={columnNames}
        onPageChange={onPageChange}
        currentPage={currentPage}
        total={totalUsers}
        rowsPerPage={usersPerPage}
        handleSelectChange={handleSelectChange}
        isLoading={isLoading}
      />
    </div>
  );
};
