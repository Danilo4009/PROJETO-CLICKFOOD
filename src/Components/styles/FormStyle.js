
import React, { useState } from 'react';
import { Form, Title, Label, Input, Button, HorarioContainer } from './AppStyle'; 

const CadastroRestaurante = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    prato: '',
    fotoPrato: null,
    valorPrato: '',
    horarioAbertura: '',
    horarioFechamento: '',
    cnpj: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Cadastrar Restaurante</Title>

      <Label>Nome da Loja:</Label>
      <Input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <Label>Email:</Label>
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Label>Telefone:</Label>
      <Input
        type="tel"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
        pattern="[0-9]{11}"  
        required
      />

      <Label>Endereço:</Label>
      <Input
        type="text"
        name="endereco"
        value={formData.endereco}
        onChange={handleChange}
        required
      />

      <Label>Nome do Prato:</Label>
      <Input
        type="text"
        name="prato"
        value={formData.prato}
        onChange={handleChange}
        required
      />

      <Label>Foto do Prato:</Label>
      <Input
        type="file"
        name="fotoPrato"
        onChange={handleChange}
        accept="image/*" 
        required
      />

      <Label>Preço:</Label>
      <Input
        type="number"
        name="valorPrato"
        value={formData.valorPrato}
        onChange={handleChange}
        required
      />

      <Label>Horário de Funcionamento:</Label>
      <HorarioContainer>
        <div>
          <Label>Hora de Abertura:</Label>
          <Input
            type="time"
            name="horarioAbertura"
            value={formData.horarioAbertura}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Hora de Fechamento:</Label>
          <Input
            type="time"
            name="horarioFechamento"
            value={formData.horarioFechamento}
            onChange={handleChange}
            required
          />
        </div>
      </HorarioContainer>

      <Label>CNPJ:</Label>
      <Input
        type="text"
        name="cnpj"
        value={formData.cnpj}
        onChange={handleChange}
        required
      />

      <Button type="submit">Cadastrar</Button>
    </Form>
  );
};

export { CadastroRestaurante };
