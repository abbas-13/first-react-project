import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { AuthContext } from "../context/authContext";

function HomePage() {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("authToken")
    ? jwtDecode(localStorage.getItem("authToken"))
    : null;

  const userName = user?.firstName ? user?.firstName : token?.given_name;

  return (
    <div className="flex justify-center">
      <div className=" p-16 text-4xl">Hello {userName}</div>
    </div>
  );
}

export default HomePage;
