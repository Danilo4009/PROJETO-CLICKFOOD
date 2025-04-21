import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Arial, sans-serif';
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

export const PaymentContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const MethodsContainer = styled.div`
  flex: 1;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const MethodButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 2px solid ${props => props.$selected ? '#ff6b00' : '#eee'};
  border-radius: 8px;
  background: ${props => props.$selected ? '#fff8f2' : '#fff'};
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: all 0.3s;

  &:hover {
    border-color: #ff6b00;
  }
`;

export const PaymentDetails = styled.div`
  flex: 1;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-height: 300px;
`;

export const PixContainer = styled.div`
  text-align: center;
`;

export const QrCodePlaceholder = styled.div`
  margin: 1rem auto;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  max-width: 250px;
`;

export const QrCode = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background: #fff;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

export const PixCode = styled.p`
  background: #f0f0f0;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  margin-top: 1rem;
`;

export const CartaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: ${props => props.$width || '100%'};
`;

export const RowInputs = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EntregaContainer = styled.div`
  text-align: center;
`;

export const EntregaList = styled.ul`
  text-align: left;
  padding-left: 1.5rem;
`;

export const Aviso = styled.p`
  font-style: italic;
  color: #666;
`;

export const Summary = styled.div`
  width: 350px;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  margin-top: 1rem;
  border-top: 2px solid #ddd;
  font-weight: bold;
  font-size: 1.1rem;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #ff6b00;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #e05d00;
  }
`;