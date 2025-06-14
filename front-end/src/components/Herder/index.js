import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { AreaHeader, CartPanel, Overlay } from "./styled";
import { useCarrinho } from "../contexts/CarrinhoContext";

function Header(props) {
  const [address, setAddress] = useState("Obtendo localização...");
  const [cartOpen, setCartOpen] = useState(false);
  const {
    carrinho,
    totalItens,
    removerDoCarrinho,
    atualizarQuantidade,
    calcularTotal,
  } = useCarrinho();
  const navigate = useNavigate();

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
        setAddress(`${city || town || village}, ${state}`);
      } else {
        setAddress("Endereço não encontrado");
      }
    } catch (error) {
      setAddress("Erro ao obter endereço");
    }
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
              <Link to="/cadastro">Cadastrar Loja</Link>
            </li>
            <li>
              <Link to="/lojas">Lojas</Link>
            </li>
            <li>
              <Link to="/relatorio">Relatório</Link>
            </li>

          </ul>

          <div className="avatar">
            <label>{address}</label>
            <label>{props.user.name}</label>
            <div
              className="cart-icon-container"
              onClick={() => setCartOpen(true)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <ShoppingCartIcon className="carrinho" />
              {totalItens > 0 && (
                <span className="cart-badge">{totalItens}</span>
              )}
            </div>
          </div>
        </nav>
      </div>

      {cartOpen && <Overlay onClick={() => setCartOpen(false)} />}

      <CartPanel $isOpen={cartOpen}>
        <CloseIcon className="close-cart" onClick={() => setCartOpen(false)} />
        <h3>Seu Carrinho</h3>

        {carrinho.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          <>
            <ul>
              {carrinho.map((item) => (
                <li key={item.id}>
                  <div className="cart-item">
                    <span>{item.nome}</span>
                    <div className="cart-item-controls">
                      <button
                        onClick={() =>
                          atualizarQuantidade(item.id, item.quantidade - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantidade}</span>
                      <button
                        onClick={() =>
                          atualizarQuantidade(item.id, item.quantidade + 1)
                        }
                      >
                        +
                      </button>
                      <span>
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                      <button onClick={() => removerDoCarrinho(item.id)}>
                        ×
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                if (carrinho.length === 0) return;
                setCartOpen(false);
                navigate("/pagamento");
              }}
            >
              Finalizar Pedido
            </button>
          </>
        )}
      </CartPanel>
    </AreaHeader>
  );
}

export default Header;
