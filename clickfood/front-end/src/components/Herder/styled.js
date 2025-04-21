import styled from "styled-components";

export const AreaHeader = styled.div`
  padding: 10px 0;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .logo {
    img {
      height: 20px;
    }
  }

  nav {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;
      gap: 30px;
      margin-left: 40px;
    }

    li {
      a {
        text-decoration: none;
        color: #000000;
        font-weight: bold;
        white-space: nowrap;
        
        &:hover {
          color: #ea1d2c;
        }
      }
    }

    .avatar {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-left: auto;

      label {
        font-size: 14px;
        color: #000000;
        white-space: nowrap;
      }

      .cart-icon-container {
        position: relative;
        cursor: pointer;
        margin-left: 15px;

        .carrinho {
          color: #ea1d2c;
          font-size: 26px;
          transition: 0.3s;
          
          &:hover {
            color: #d62828;
          }
        }

        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #ea1d2c;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }
      }

      @media screen and (max-width: 600px) {
        gap: 10px;
        
        label:first-child {
          display: none;
        }
      }
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

export const CartPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 85vh;
  background: white;
  padding: 20px;
  z-index: 1002;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  border-radius: 0 0 0 12px;

  .close-cart {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }

  h3 {
    color: #ea1d2c;
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    text-align: center;
    color: #666;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    flex-grow: 1;
  }

  li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .cart-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .cart-item-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    button {
      background: #f0f0f0;
      border: none;
      width: 25px;
      height: 25px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: #e0e0e0;
      }

      &:last-child {
        color: #ff0000;
        background: transparent;
        font-size: 18px;
      }
    }

    span {
      min-width: 20px;
      text-align: center;
    }
  }

  .cart-total {
    margin: 20px 0;
    padding-top: 10px;
    border-top: 1px solid #eee;
    text-align: right;
    font-size: 1.1rem;
  }

  .checkout-btn {
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
    border-radius: 4px;
    transition: 0.3s;
    margin-top: 10px;

    &:hover {
      background: #388e3c;
    }
  }
`;