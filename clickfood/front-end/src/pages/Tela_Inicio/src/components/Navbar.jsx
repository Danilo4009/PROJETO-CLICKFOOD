import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Click Food" className="logo" />
      <div className="navbar-icons">
        <input
          type="text"
          placeholder="Buscar por item ou loja"
          className="search-bar"
        />

        <span>Perfil</span>
        <span>Carrinho</span>
      </div>
    </nav>
  );
}

export default Navbar;
