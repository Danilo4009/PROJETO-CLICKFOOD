import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StoresContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 80px auto 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const StoresList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StoreCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const StoreImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const StoreInfo = styled.div`
  padding: 15px;
`;

const StoreName = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const StoreAddress = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0 0;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 16px;
  grid-column: 1 / -1;
`;

export const adicionarLoja = (novaLoja) => {
  const lojasSalvas = JSON.parse(localStorage.getItem('lojasCadastradas')) || [];
  const cnpjExistente = lojasSalvas.some(loja => loja.cnpj === novaLoja.cnpj);
  if (cnpjExistente) {
    throw new Error('Já existe uma empresa cadastrada com este CNPJ!');
  }
  
  const lojasAtualizadas = [...lojasSalvas, { ...novaLoja, pratos: [] }];
  localStorage.setItem('lojasCadastradas', JSON.stringify(lojasAtualizadas));
  return lojasAtualizadas;
};

const getLojasComPratos = () => {
  const lojas = JSON.parse(localStorage.getItem('lojasCadastradas')) || [];
  return lojas.map(loja => ({
    ...loja,
    pratos: loja.pratos || []
  }));
};

const Stores = () => {
  const [lojas, setLojas] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      alert(location.state.success);
    }
    setLojas(getLojasComPratos());
    
    const handleStorageChange = () => {
      setLojas(getLojasComPratos());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location.state]);

  return (
    <StoresContainer>
      <Title>Lojas Cadastradas</Title>
      <StoresList>
        {lojas.length > 0 ? (
          lojas.map((loja) => (
            <Link to="/detalhes" state={{ restaurante: loja }} key={loja.id}>
              <StoreCard>
                <StoreImage 
                  src={loja.banner || 'https://via.placeholder.com/250x150?text=Sem+Imagem'} 
                  alt={loja.nome} 
                />
                <StoreInfo>
                  <StoreName>{loja.nome}</StoreName>
                </StoreInfo>
              </StoreCard>
            </Link>
          ))
        ) : (
          <EmptyMessage>Nenhuma loja cadastrada ainda</EmptyMessage>
        )}
      </StoresList>
    </StoresContainer>
  );
};

export default Stores;