import { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (prato) => {
    setCarrinho(prev => {
      const existeNoCarrinho = prev.find(item => item.id === prato.id);
      if (existeNoCarrinho) {
        return prev.map(item =>
          item.id === prato.id 
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...prato, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setCarrinho(prev =>
      prev.map(item => item.id === id ? { ...item, quantidade } : item)
    );
  };

  const limparCarrinho = () => setCarrinho([]);

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        totalItens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        calcularTotal
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);