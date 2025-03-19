import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Click Food" className="logo" />
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por item ou loja"
          className="search-bar"
        />
      </div>
      <div className="navbar-icons">
        <span className="profile">Perfil</span>
        <span className="cart">Carrinho</span>
      </div>
    </nav>
  );
}

export default Navbar;
