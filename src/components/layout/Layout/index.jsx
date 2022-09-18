import React from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";

function Layout({ children }) {
  return (
    <>
      <div className="wrapper">
        <Navigation />
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
