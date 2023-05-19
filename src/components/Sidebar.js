import { Link } from "react-router-dom";

export const Sidebar = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/AboutUs" },
    { label: "Contact Us", path: "/ContactUs" },
    { label: "Users", path: "/Users" },
    { label: "Posts", path: "/Posts" },
  ];

  const renderedLinks = links.map((link) => (
      <li key={link.label} className="mb-2">
        <Link to={link.path}>{link.label}</Link>
      </li>
    ));

  return (
    <div className="w-48 h-full bg-slate-200 border-r-2 border-gray-300 p-4">
      <ul>{renderedLinks}</ul>
    </div>
  );
};
