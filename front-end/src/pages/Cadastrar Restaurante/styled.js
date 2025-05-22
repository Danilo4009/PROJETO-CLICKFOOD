// src/components/CadastroForm/styles.js
import styled from 'styled-components';

export const Container = styled.form`
  background-color: #fff;
  padding: 30px;
  max-width: 450px;
  margin: auto;
  margin-top: 70px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #ccc;
  top: 50%;
  left: 50%;
  width: 450px;
  margin-bottom: 25px;

`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const Input = styled.input`
  color: #3e3e3e;
  background: transparent;
  font-weight: 500;
  outline: none;
  border: 1px solid #dcdcdc;
  position: relative;
  height: auto;
  z-index: 1;
  font-size: 1rem;
  line-height: 20px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 13px 20px;
  width: 100%;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #45a049;
  }
`;
