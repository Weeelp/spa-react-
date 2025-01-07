import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/products">Список всех карт</Link>
        <Link to="/create-product">Создать карту</Link>
      </div>
    </div>
  );
};

export default Navbar;
