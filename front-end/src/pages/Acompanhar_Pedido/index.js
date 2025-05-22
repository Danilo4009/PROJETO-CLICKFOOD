import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Container,
  Title,
  ProgressBar,
  Step,
  StepCircle,
  StatusDetails,
  ItemList,
  Item,
  Total,
} from "./styled";

export default function AcompanhamentoPedido() {
  const location = useLocation();
  const pedido = location.state?.pedido;

  const etapas = ["Pedido recebido", "Em preparo", "A caminho", "Entregue"];

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!pedido) return;
    const intervalo = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < etapas.length - 1) return prev + 1;
        clearInterval(intervalo);
        return prev;
      });
    }, 5000);

    return () => clearInterval(intervalo);
  }, [pedido]);

  if (!pedido) {
    return <Container>Pedido não encontrado.</Container>;
  }

  return (
    <Container>
      <Title>Acompanhamento do Pedido</Title>

      <ProgressBar>
        {etapas.map((etapa, idx) => (
          <Step
            key={idx}
            active={idx === statusIndex}
            completed={idx < statusIndex}
          >
            <StepCircle completed={idx <= statusIndex}>{idx + 1}</StepCircle>
            {etapa}
          </Step>
        ))}
      </ProgressBar>

      <StatusDetails>
        <h3>Status atual: {etapas[statusIndex]}</h3>
        <h4>Itens do pedido:</h4>
        <ItemList>
          {pedido.carrinho.map((item) => (
            <Item key={item.id}>
              {item.quantidade}x {item.nome} - R${" "}
              {(item.preco * item.quantidade).toFixed(2)}
            </Item>
          ))}
        </ItemList>
        <Total>Total: R$ {pedido.total.toFixed(2)}</Total>
      </StatusDetails>
    </Container>
  );
}
