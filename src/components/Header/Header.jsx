import React from "react";
import { Link } from "react-router-dom";
import logo from"../../images/Logo.svg";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-black text-white">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="" />
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to='/'>Shop</Link >
            </li>
            <li>
              <Link to='/orders'>
              Order Review
              </Link>
            </li>
            <li>
              <Link to='/inventory'>Manage Inventory</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
