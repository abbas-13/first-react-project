import { Link } from "react-router-dom";

export const Sidebar = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/AboutUs" },
    { label: "Contact Us", path: "/ContactUs" },
  ];

  const renderedLinks = links.map((link) => {
    return (
      <li className="mb-2">
        <Link key={link.label} to={link.path}>
          {link.label}
        </Link>
      </li>
    );
  });
  return (
    <div className="w-48 h-full bg-slate-200 border-r-2 border-gray-300 p-4">
      <ul>{renderedLinks}</ul>
    </div>
  );
};
