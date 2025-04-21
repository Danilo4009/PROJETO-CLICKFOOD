import React, { useState } from 'react';
import { useCarrinho } from '../../components/contexts/CarrinhoContext';
import { 
  Container,
  Title,
  PaymentContainer,
  MethodsContainer,
  MethodButton,
  PaymentDetails,
  PixContainer,
  QrCodePlaceholder,
  QrCode,
  PixCode,
  CartaoContainer,
  Input,
  RowInputs,
  EntregaContainer,
  EntregaList,
  Aviso,
  Summary,
  Item,
  Total,
  CheckoutButton
} from './styled';

export default function Pagamentos() {
  const { carrinho, calcularTotal } = useCarrinho();
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });

  const handlePagamento = () => {
    alert(`Pagamento via ${metodoPagamento} confirmado!`);
  };

  const handleChangeCartao = (e) => {
    const { name, value } = e.target;
    setDadosCartao(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Title>Finalizar Pagamento</Title>
      
      <PaymentContainer>
        <MethodsContainer>
          <h2>Método de Pagamento</h2>
          
          <MethodButton 
            $selected={metodoPagamento === 'pix'}
            onClick={() => setMetodoPagamento('pix')}
          >
            PIX
          </MethodButton>
          
          <MethodButton 
            $selected={metodoPagamento === 'credito'}
            onClick={() => setMetodoPagamento('credito')}
          >
            Cartão de Crédito
          </MethodButton>
          
          <MethodButton 
            $selected={metodoPagamento === 'debito'}
            onClick={() => setMetodoPagamento('debito')}
          >
            Cartão de Débito
          </MethodButton>
          
          <MethodButton 
            $selected={metodoPagamento === 'entrega'}
            onClick={() => setMetodoPagamento('entrega')}
          >
            Pagamento na Entrega
          </MethodButton>
        </MethodsContainer>

        <PaymentDetails>
          {metodoPagamento === 'pix' && (
            <PixContainer>
              <h3>Pagamento via PIX</h3>
              <QrCodePlaceholder>
                <QrCode>QR CODE</QrCode>
                <p>Escaneie o QR Code com seu app bancário</p>
              </QrCodePlaceholder>
              <PixCode>Chave PIX: 123.456.789-09</PixCode>
            </PixContainer>
          )}

          {metodoPagamento === 'credito' && (
            <CartaoContainer>
              <h3>Cartão de Crédito</h3>
              <Input
                type="text"
                name="numero"
                placeholder="Número do Cartão"
                value={dadosCartao.numero}
                onChange={handleChangeCartao}
              />
              <Input
                type="text"
                name="nome"
                placeholder="Nome no Cartão"
                value={dadosCartao.nome}
                onChange={handleChangeCartao}
              />
              <RowInputs>
                <Input
                  type="text"
                  name="validade"
                  placeholder="MM/AA"
                  value={dadosCartao.validade}
                  onChange={handleChangeCartao}
                  $width="48%"
                />
                <Input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={dadosCartao.cvv}
                  onChange={handleChangeCartao}
                  $width="48%"
                />
              </RowInputs>
            </CartaoContainer>
          )}

          {metodoPagamento === 'debito' && (
            <CartaoContainer>
              <h3>Cartão de Débito</h3>
              <Input
                type="text"
                name="numero"
                placeholder="Número do Cartão"
                value={dadosCartao.numero}
                onChange={handleChangeCartao}
              />
              <Input
                type="text"
                name="nome"
                placeholder="Nome no Cartão"
                value={dadosCartao.nome}
                onChange={handleChangeCartao}
              />
              <RowInputs>
                <Input
                  type="text"
                  name="validade"
                  placeholder="MM/AA"
                  value={dadosCartao.validade}
                  onChange={handleChangeCartao}
                  $width="48%"
                />
                <Input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={dadosCartao.cvv}
                  onChange={handleChangeCartao}
                  $width="48%"
                />
              </RowInputs>
            </CartaoContainer>
          )}

          {metodoPagamento === 'entrega' && (
            <EntregaContainer>
              <h3>Pagamento na Entrega</h3>
              <p>Você poderá pagar com:</p>
              <EntregaList>
                <li>Dinheiro</li>
                <li>Cartão de Débito</li>
                <li>Cartão de Crédito</li>
              </EntregaList>
              <Aviso>O troco será fornecido se necessário</Aviso>
            </EntregaContainer>
          )}
        </PaymentDetails>

        <Summary>
          <h2>Resumo do Pedido</h2>
          {carrinho.map(item => (
            <Item key={item.id}>
              <span>{item.quantidade}x {item.nome}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            </Item>
          ))}
          <Total>
            <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
          </Total>
          <CheckoutButton onClick={handlePagamento}>
            Confirmar Pedido
          </CheckoutButton>
        </Summary>
      </PaymentContainer>
    </Container>
  );
}