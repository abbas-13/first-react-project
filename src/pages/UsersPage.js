import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { List } from "../components/List";

export const UsersPage = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("username");

  const fetchData = async (queryString = "/") => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users${queryString}`
    );
    const usersData = await response.json();
    setData(usersData);
  };

  useEffect(() => {
    fetchData(queryParam ? `?username=${queryParam}` : "");
  }, [queryParam]);

  const columnNames = [
    { value: "User ID", keyName: "id" },
    { value: "Name", keyName: "name" },
    { value: "Username", keyName: "username" },
  ];

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const queryString = inputValue ? `username=${inputValue}` : "";
    setSearchParams(queryString);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="py-8">
        <input
          onChange={handleChange}
          className="rounded-lg border mx-3.5 p-1 w-64"
          placeholder="Username"
        />
        <button className="border w-24 rounded-lg mx-2.5 p-1">Search</button>
      </form>
      <List data={data} columns={columnNames} />
    </div>
  );
};
