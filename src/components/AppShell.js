import PropTypes from "prop-types";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const AppShell = ({ children }) => (
  <div className="h-screen flex flex-col">
    <Navbar />
    <div className="flex-1 flex">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
    <Footer />
  </div>
);

AppShell.defaultProps = {
  children: {},
};

AppShell.propTypes = {
  children: PropTypes.node,
};
