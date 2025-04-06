import styled from "styled-components";

export const AreaHeader = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  .container {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo img {
    height: 20px;
  }

  nav {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    ul {
      display: flex;
    }
    li {
      list-style: none;
      margin-left: 20px;

      a {
        text-decoration: none;
        color: #000000;
        font-weight: bold;

        &:hover {
          color: #ea1d2c;
        }
      }
    }

    .avatar {
      display: flex;
      align-items: center;

      img {
        width: 35px;
        border-radius: 20px;
        margin-left: 20px;
        margin-right: 10px;
        cursor: pointer;
      }

      label {
        font-size: 14px;
        cursor: pointer;
        color: #000000;
      }

      .carrinho {
        color: #ea1d2c;
        margin-left: 20px;
        cursor: pointer;
        font-size: 28px;
        transition: 0.3s;

        &:hover {
          color: #d62828;
        }
      }

      @media screen and (max-width: 600px) {
        label {
          display: none;
        }
      }
    }
  }
`;

// Estilização do Carrinho
export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.open ? "0" : "-320px")};
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease-in-out;

  h3 {
    margin-bottom: 15px;
    color: #ea1d2c;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .close-cart {
    align-self: flex-end;
    cursor: pointer;
    font-size: 24px;
    color: #ea1d2c;
    transition: 0.3s;

    &:hover {
      color: #d62828;
    }
  }

  .checkout-btn {
    margin-top: -10px; /* Ajuste conforme necessário */
    background: rgb(234, 29, 29);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin-top: 0;
    text-align: center;
    font-size: 16px;
    transition: 0.3s;

    &:hover {
      background: #d62828;
    }
  }
`;
