import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { AreaHeader, CartOverlay } from "./styled";

function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [address, setAddress] = useState("Obtendo localização...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoordinates(latitude, longitude);
        },
        () => {
          setAddress("Erro ao obter localização");
        }
      );
    } else {
      setAddress("Geolocalização não suportada");
    }
  }, []);

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();

      if (data && data.address) {
        const { city, town, village, state } = data.address;
        setAddress(`${city || town || village}, ${state}`); // Exibe Cidade + Estado
      } else {
        setAddress("Endereço não encontrado");
      }
    } catch (error) {
      setAddress("Erro ao obter endereço");
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <AreaHeader>
      <div className="container">
        <div className="logo">
          <img src="../../../ClickFood.png" alt="Logo" />
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/restaurantes">Cadastrar Loja</Link>
            </li>
          </ul>

          <div className="avatar">
            <label>{address}</label> {/* Exibe o endereço do usuário */}
            <img src={props.user.avatar} alt="Usuário" />
            <label>{props.user.name}</label>
            <ShoppingCartIcon className="carrinho" onClick={toggleCart} />
          </div>
        </nav>
      </div>

      {/* Carrinho de Compras */}
      <CartOverlay open={cartOpen}>
        <CloseIcon className="close-cart" onClick={toggleCart} />
        <h3>Seu Carrinho</h3>
        <ul>
          <li>
            🍔 X-Burguer <span>R$20,00</span>
          </li>
          <li>
            🍟 Batata Frita <span>R$10,00</span>
          </li>
        </ul>
        <button className="checkout-btn" onClick={toggleCart}>
          Finalizar Pedido
        </button>
      </CartOverlay>
    </AreaHeader>
  );
}

export default Header;
