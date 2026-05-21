import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./SideBar";

const Layout = ({ children }:{children:React.ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className={`app-wrapper ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={isOpen} />
      <Header onMenuToggle={toggle} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;