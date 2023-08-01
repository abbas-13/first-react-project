import { useContext } from "react";

import { AuthContext } from "../context/authContext";

function HomePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center">
      <div className=" p-16 text-4xl">Hello {user?.firstName}</div>
    </div>
  );
}

export default HomePage;
