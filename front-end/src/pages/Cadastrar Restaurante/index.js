import React, { useState } from "react";
import { Container, FormGroup, Label, Input, Button } from './styled';

const CadastroRestaurante = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setForm((prev) => ({ ...prev, imagem: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.nome);
    formData.append("email", form.email);
    formData.append("cnpj", form.cnpj);
    formData.append("endereco", form.endereco);
    formData.append("telefone", form.telefone);

    if (form.imagem) {
      formData.append("imagem", form.imagem);
    }

    try {
      const response = await fetch("http://localhost:3000/cadastrar-restaurante", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Restaurante cadastrado com sucesso!");
        setForm({
          nome: "",
          email: "",
          cnpj: "",
          endereco: "",
          telefone: "",
          imagem: null,
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Erro ao cadastrar restaurante:", error);
      alert("Erro ao tentar cadastrar o restaurante.");
    }
  };

  return (
   <Container onSubmit={handleSubmit}>
      <h2>Cadastro</h2>

      <FormGroup>
        <Label>Nome:</Label>
        <Input type="text" name="nome" value={form.nome} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>Email:</Label>
        <Input type="email" name="email" value={form.email} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>CNPJ:</Label>
        <Input type="text" name="cnpj" value={form.cnpj} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>Endereço:</Label>
        <Input type="text" name="endereco" value={form.endereco} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>Telefone:</Label>
        <Input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required />
      </FormGroup>

      <FormGroup>
        <Label>Imagem:</Label>
        <Input type="file" name="imagem" accept="image/*" onChange={handleChange} />
      </FormGroup>

      <Button type="submit">Cadastrar</Button>
    </Container>
  );
};

export default CadastroRestaurante;
