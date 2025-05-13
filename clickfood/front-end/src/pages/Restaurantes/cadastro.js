import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, Button, FileInput, PreviewImage, FormTitle } from './styled.cadastro';
import { adicionarLoja } from '../../components/Stores';

const CadastroRestaurante = () => {
  const [loja, setLoja] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cnpj: '',
    banner: null
  });

  const [preview, setPreview] = useState(null);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const formatarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cnpj') {
      const numeros = value.replace(/\D/g, '');
      if (numeros.length <= 14) {
        setLoja({ ...loja, [name]: numeros });
      }
    } else {
      setLoja({ ...loja, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setLoja({ ...loja, banner: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (loja.cnpj.length !== 14) {
      setErro('CNPJ deve ter 14 dígitos');
      return;
    }

    try {
      const novaLoja = {
        ...loja,
        id: Date.now(),
        banner: preview || 'https://via.placeholder.com/800x400?text=Sem+Banner',
        pratos: [] // Inicializa array de pratos vazio
      };
      
      await adicionarLoja(novaLoja);
      navigate('/lojas', { 
        state: { 
          success: `Loja ${novaLoja.nome} cadastrada com sucesso!` 
        } 
      });
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Cadastro da Loja</FormTitle>
      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}
      
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nome"
          placeholder="Nome da Loja"
          value={loja.nome}
          onChange={handleChange}
          required
        />
        
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={loja.email}
          onChange={handleChange}
          required
        />
        
        <Input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={loja.telefone}
          onChange={handleChange}
          required
        />
        
        <Input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={loja.endereco}
          onChange={handleChange}
          required
        />
        
        <Input
          type="text"
          name="cnpj"
          placeholder="CNPJ (somente números)"
          value={formatarCNPJ(loja.cnpj)}
          onChange={handleChange}
          required
        />
        
        <div>
          <label>Banner da Loja:</label>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && <PreviewImage src={preview} alt="Preview" />}
        </div>
        
        <Button type="submit">Cadastrar</Button>
      </form>
    </FormContainer>
  );
};

export default CadastroRestaurante;