
import styled from 'styled-components';

export const Form = styled.form`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 280px;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #555;
  margin-bottom: 4px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
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
  padding: 10px;
  background-color: #ff6f61;
  color: white;
  font-size: 14px;
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
  gap: 10px;

  div {
    width: 48%;
  }
`;
