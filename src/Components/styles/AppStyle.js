
import styled from 'styled-components';

export const ContainerPage = styled.div`
  width: 100vw;
  height: 120vh;
  background-image: url('/assets/fundo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: white;
  padding: 10px; 
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; 
  box-sizing: border-box;
  position: relative;
  top: -50px; 
`;


export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 10px; 
  font-size: 18px; 
`;

export const Label = styled.label`
  font-size: 11px; 
  color: #555;
  margin-bottom: 3px; 
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 6px; 
  margin-bottom: 8px; 
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 12px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff6f61;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px; 
  background-color: #ff6f61;
  color: white;
  font-size: 13px; 
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff3d2f;
  }
`;

export const HorarioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px; 
  margin-bottom: 8px;

  div {
    flex: 1;
  }
`;
