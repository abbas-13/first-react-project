import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "../context/authContext";

export const Auth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  const hardPassword = "CQutx25i8r";

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const usersData = await response.json();

      setUser(usersData);
      localStorage.setItem("authToken", usersData.token);
      setToken(jwtDecode(usersData.token));
      setLoading(false);

      navigate("/Homepage");
    } catch (err) {
      console.log(err.message);
    }
  };

  const isTokenValid = () => {
    const authToken = localStorage.getItem("authToken")
      ? jwtDecode(localStorage.getItem("authToken"))
      : 0;

    if (!authToken) {
      return false;
    }

    const currentDate = new Date();
    const tokenExp = new Date(authToken.exp * 1000);

    return tokenExp > currentDate;
  };

  const fetchUser = async () => {
    try {
      const { username } = jwtDecode(localStorage.getItem("authToken"));
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password: hardPassword,
        }),
      });

      const userToDisplay = await response.json();

      setUser(userToDisplay);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      const isValid = isTokenValid();

      if (!isValid) {
        navigate("/");
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, user, setUser, loading, setLoading, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

Auth.defaultProps = {
  children: null,
};

Auth.propTypes = {
  children: PropTypes.node,
};
