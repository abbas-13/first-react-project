import { useState, useContext } from "react";

import { AuthContext } from "../context/authContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (key) => (event) => {
    setInputValue((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(inputValue.username, inputValue.password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow p-14 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block mb-6 font-semibold text-xl"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-6 py-4 border border-gray-300 rounded text-lg"
              type="text"
              id="username"
              value={inputValue.username}
              onChange={handleChange("username")}
              name="username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-6 font-semibold text-xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-6 py-4 border border-gray-300 rounded text-lg"
              type="password"
              id="password"
              value={inputValue.password}
              onChange={handleChange("password")}
              name="password"
            />
          </div>
          <button className="w-full bg-blue-500 text-xl hover:bg-blue-600 text-white font-bold py-6 px-8 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
