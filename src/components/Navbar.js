import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">

    <span class="it-blue">IT</span><span class="viec-black">viec</span>
      </div>
      <ul className="navbar__menu">
        <li><Link to="/">Trang chủ</Link></li>
        <li><Link to="/services">Tìm việc làm</Link></li>
        <li><Link to="/about">Hỗ trợ</Link></li>
      </ul>
      <div className="navbar__login">
        <Link to="/login" className="navbar__login-btn">Đăng nhập</Link>
      </div>
      <div className="navbar__login">
        <Link to="/login" className="navbar__login_employer-btn">Đăng tuyển</Link>
      </div>
    </nav>
  );
};

export default Navbar;
