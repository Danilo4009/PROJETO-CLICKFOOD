import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #ea1d2c;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #ea1d2c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d62828;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  margin: 1rem 0;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 4px;
  display: block;
`;