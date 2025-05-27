import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../components/contexts/CarrinhoContext";
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
  CheckoutButton,
} from "./styled";

export default function Pagamentos() {
  const { carrinho, calcularTotal } = useCarrinho();
  const navigate = useNavigate();

  // Estado para endereço
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
  });

  // Estado para mostrar formulário de endereço e método de pagamento
  const [editarEndereco, setEditarEndereco] = useState(true);

  const [metodoPagamento, setMetodoPagamento] = useState("pix");
  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  // Pega localização do usuário e faz reverse geocode para preencher endereço parcialmente
  useEffect(() => {
    if (!editarEndereco) return; // só roda quando estiver editando endereço

    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data.address) {
            setEndereco((prev) => ({
              ...prev,
              rua: data.address.road || "",
              bairro: data.address.suburb || "",
              cidade:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "",
              estado: data.address.state || "",
              cep: data.address.postcode || "",
            }));
          }
        } catch (error) {
          console.error("Erro ao obter endereço via geolocalização:", error);
        }
      },
      () => {
        alert("Permissão para geolocalização negada.");
      }
    );
  }, [editarEndereco]);

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCartao = (e) => {
    const { name, value } = e.target;
    setDadosCartao((prev) => ({ ...prev, [name]: value }));
  };

  const handlePagamento = async () => {
    // valida endereço simples
    if (
      !endereco.rua ||
      !endereco.cidade ||
      !endereco.estado ||
      !endereco.cep
    ) {
      alert("Por favor, preencha o endereço completo para entrega.");
      return;
    }

    alert(`Pagamento via ${metodoPagamento} confirmado!`);

    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario || !usuario.email) {
      alert("Usuário não logado ou e-mail não encontrado.");
      return;
    }

    const response = await fetch("http://localhost:3000/enviar-nota", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carrinho,
        total: calcularTotal(),
        email: usuario.email,
        enderecoEntrega: endereco,
      }),
    });

  const registrarPedido = await fetch("http://localhost:3000/registrar-pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      carrinho,
      total: calcularTotal(),
      email: usuario.email,
      enderecoEntrega: endereco,
      metodoPagamento,
    }),
  });

const resposta = await registrarPedido.json();
if (resposta.status !== "ok") {
  alert("Erro ao registrar o pedido no banco de dados.");
  return;
}

    const data = await response.json();
    if (data.status === "ok") {
      alert("Nota fiscal enviada com sucesso para seu e-mail!");
      navigate("/acompanhamento", {
        state: { pedido: { carrinho, total: calcularTotal(), endereco } },
      });
    } else {
      alert("Erro ao enviar a nota fiscal.");
    }
  };

  return (
    <Container>
      <Title>Finalizar Pedido</Title>

      {editarEndereco ? (
        <EntregaContainer>
          <h2>Endereço de Entrega</h2>
          <Input
            type="text"
            name="rua"
            placeholder="Rua"
            value={endereco.rua}
            onChange={handleEnderecoChange}
          />
          <Input
            type="text"
            name="bairro"
            placeholder="Bairro"
            value={endereco.bairro}
            onChange={handleEnderecoChange}
          />
          <Input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={endereco.cidade}
            onChange={handleEnderecoChange}
          />
          <Input
            type="text"
            name="estado"
            placeholder="Estado"
            value={endereco.estado}
            onChange={handleEnderecoChange}
          />
          <Input
            type="text"
            name="cep"
            placeholder="CEP"
            value={endereco.cep}
            onChange={handleEnderecoChange}
          />
          <Input
            type="text"
            name="complemento"
            placeholder="Complemento (opcional)"
            value={endereco.complemento}
            onChange={handleEnderecoChange}
          />

          <CheckoutButton onClick={() => setEditarEndereco(false)}>
            Confirmar Endereço e Continuar
          </CheckoutButton>
        </EntregaContainer>
      ) : (
        <>
          <PaymentContainer>
            <MethodsContainer>
              <h2>Método de Pagamento</h2>

              <MethodButton
                $selected={metodoPagamento === "pix"}
                onClick={() => setMetodoPagamento("pix")}
              >
                PIX
              </MethodButton>

              <MethodButton
                $selected={metodoPagamento === "credito"}
                onClick={() => setMetodoPagamento("credito")}
              >
                Cartão de Crédito
              </MethodButton>

              <MethodButton
                $selected={metodoPagamento === "debito"}
                onClick={() => setMetodoPagamento("debito")}
              >
                Cartão de Débito
              </MethodButton>

              <MethodButton
                $selected={metodoPagamento === "entrega"}
                onClick={() => setMetodoPagamento("entrega")}
              >
                Pagamento na Entrega
              </MethodButton>
            </MethodsContainer>

            <PaymentDetails>
              {metodoPagamento === "pix" && (
                <PixContainer>
                  <h3>Pagamento via PIX</h3>
                  <QrCodePlaceholder>
                    <QrCode>
                      <img src="../../../qrcode.png" alt="Logo" />
                    </QrCode>
                    <p>Escaneie o QR Code com seu app bancário</p>
                  </QrCodePlaceholder>
                  <PixCode>Chave PIX: 123.456.789-09</PixCode>
                </PixContainer>
              )}

              {(metodoPagamento === "credito" ||
                metodoPagamento === "debito") && (
                <CartaoContainer>
                  <h3>
                    {metodoPagamento === "credito"
                      ? "Cartão de Crédito"
                      : "Cartão de Débito"}
                  </h3>
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

              {metodoPagamento === "entrega" && (
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
              {carrinho.map((item) => (
                <Item key={item.id}>
                  <span>
                    {item.quantidade}x {item.nome}
                  </span>
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
        </>
      )}
    </Container>
  );
}
