import { useState } from "react";

function ContactUsPage() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
  });

  const handleChange = (key) => (event) => {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [key]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={inputValue.firstName}
        onChange={handleChange("firstName")}
        placeholder="First Name"
      />
      <input
        name="lastName"
        value={inputValue.lastName}
        onChange={handleChange("lastName")}
        placeholder="Last Name"
      />
      <input
        name="email"
        value={inputValue.email}
        onChange={handleChange("email")}
        type="email"
        placeholder="Email"
      />
      <input
        name="query"
        value={inputValue.query}
        onChange={handleChange("query")}
        placeholder="Query or feedback"
      />
      <button className="flex" onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}

export default ContactUsPage;
