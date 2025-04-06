// src/components/Herder/styled.js
import styled from "styled-components";

export const AreaHeader = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  .container {
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
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
      padding: 0;
      margin: 0;
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

      .cart-icon-container {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 20px;
      }

      .carrinho {
        color: #ea1d2c;
        font-size: 28px;
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
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
      }

      @media screen and (max-width: 600px) {
        label {
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
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1001;
`;

export const CartModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 8px;
  padding: 20px;
  z-index: 1002;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);

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
    font-size: 1.2rem;
  }

  .checkout-btn {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    transition: 0.3s;
    margin-top: 10px;

    &:hover {
      background: #388E3C;
    }
  }
`;