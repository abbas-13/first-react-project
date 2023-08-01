import { useState } from "react";

function ContactUsPage() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
  });

  const handleChange = (key) => (event) => {
    setInputValue((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <div>
      <h1 className="text-2xl justify-center ml-4 py-4">Contact Us</h1>
      <form className="m-2" onSubmit={handleSubmit}>
        <input
          className="p-2 m-2 w-64 mb-4 border bg-gray-50 block focus:ring-blue-500 focus:border-blue-500 rounded border-gray-800"
          name="firstName"
          value={inputValue.firstName}
          onChange={handleChange("firstName")}
          placeholder="First Name"
        />
        <input
          className="p-2 m-2 mb-4 w-64 border bg-gray-50 block rounded border-gray-800"
          name="lastName"
          value={inputValue.lastName}
          onChange={handleChange("lastName")}
          placeholder="Last Name"
        />
        <input
          className="p-2 m-2 mb-4 w-64 border bg-gray-50 block rounded border-gray-800"
          name="email"
          value={inputValue.email}
          onChange={handleChange("email")}
          type="email"
          placeholder="Email"
        />
        <input
          className="p-2 m-2 mb-4 h-48 w-64 border bg-gray-50 block rounded border-gray-800"
          name="query"
          value={inputValue.query}
          onChange={handleChange("query")}
          placeholder="Query or feedback"
        />
        <button
          className="p-1 m-2 w-24 bg-blue-100 border border-blue-800 rounded hover:bg-blue-300 active:ring"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ContactUsPage;
