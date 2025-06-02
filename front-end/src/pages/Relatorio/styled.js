import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 2rem;
`;

export const RelatorioBox = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Titulo = styled.h1`
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
`;

export const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #f9fafb;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #ea1d2c;
  }
`;

export const Botao = styled.button`
  background-color: #ea1d2c;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ea1d2c;
  }
`;

export const Totais = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color:rgb(8, 8, 8);
  line-height: 1.6;
`;

export const GraficoBox = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
