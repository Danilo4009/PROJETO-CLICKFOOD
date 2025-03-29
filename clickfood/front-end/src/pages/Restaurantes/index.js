import React, { useState } from 'react';
import { FormContainer, Input, Button } from './syled';
import { useNavigate } from 'react-router-dom';

const CadastroRestaurante = () => {
  const [loja, setLoja] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cnpj: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoja({ ...loja, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar os dados para a próxima tela
    navigate('/perfil-loja', { state: { loja } });
  };

  return (
    <FormContainer>
      <h2>Cadastro da Loja</h2>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="nome" placeholder="Nome da Loja" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <Input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
        <Input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} required />
        <Input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} required />
        <Button type="submit">Cadastrar</Button>
      </form>
    </FormContainer>
  );
};

export default CadastroRestaurante;
