// src/pages/CadastrarPrato/index.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaImage, FaTrash, FaEdit } from 'react-icons/fa';
import {
  Container,
  Header,
  RestaurantHeader,
  BannerUpload,
  RestaurantInfo,
  MenuGrid,
  DishCard,
  DishImage,
  DishInfo,
  ActionButtons,
  CompactForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  Button,
  ImageUploadButton
} from './styled';

const CadastrarPrato = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    nome: '',
    banner: '',
    descricao: ''
  });

  const [dishes, setDishes] = useState([]);
  const [editedDish, setEditedDish] = useState({
    id: null,
    nome: '',
    preco: '',
    descricao: '',
    imagem: null,
    imagemPreview: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantRes = await fetch(`http://localhost:3000/restaurantes/${id}`);
        const restaurantData = await restaurantRes.json();
        setRestaurant(restaurantData);

        const dishesRes = await fetch(`http://localhost:3000/restaurantes/${id}/pratos`);
        const dishesData = await dishesRes.json();
        setDishes(dishesData);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    };
    fetchData();
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleFieldChange = (e, field) => {
    let value = e.target.value;
    if (field === 'preco') {
      const digitsOnly = value.replace(/\D/g, '');
      value = (parseFloat(digitsOnly) / 100).toFixed(2);
    }
    setEditedDish((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditedDish((prev) => ({
      ...prev,
      imagem: file,
      imagemPreview: URL.createObjectURL(file)
    }));
  };

  const handleEditDish = (dish) => {
    setEditedDish({
      id: dish.id,
      nome: dish.nome,
      preco: dish.preco.toFixed(2),
      descricao: dish.descricao,
      imagem: null,
      imagemPreview: dish.imagem
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setEditedDish({
      id: null,
      nome: '',
      preco: '',
      descricao: '',
      imagem: null,
      imagemPreview: ''
    });
    setIsEditing(false);
  };

  const handleDeleteDish = async (dishId) => {
    if (window.confirm('Deseja realmente excluir este prato?')) {
      try {
        await fetch(`http://localhost:3000/pratos/${dishId}`, { method: 'DELETE' });
        setDishes(dishes.filter((dish) => dish.id !== dishId));
      } catch (err) {
        console.error('Erro ao excluir prato:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nome', editedDish.nome);
    formData.append('preco', editedDish.preco);
    formData.append('descricao', editedDish.descricao);
    formData.append('restauranteId', id);
    if (editedDish.imagem) {
      formData.append('imagem', editedDish.imagem);
    }

    const url = isEditing
      ? `http://localhost:3000/pratos/${editedDish.id}`
      : `http://localhost:3000/cadastrar-prato`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || 'Erro no servidor');

      if (isEditing) {
        setDishes(dishes.map((dish) => (dish.id === result.id ? result : dish)));
      } else {
        setDishes([...dishes, result]);
      }
      resetForm();
    } catch (err) {
      console.error('Erro ao salvar prato:', err);
      alert('Erro ao salvar prato.');
    }
  };

  return (
    <Container>
      <Header>
        <div>ClickFood</div>
        <div>Infole</div>
        <div>Calendar Login</div>
        <div>Login</div>
      </Header>

      <RestaurantHeader>
        <BannerUpload>
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={(e) => handleImageChange(e, true)}
            hidden
          />
          {restaurant.banner ? (
            <img src={restaurant.banner} alt="Banner" />
          ) : (
            <label htmlFor="banner">
              <FaImage /> Adicionar Banner
            </label>
          )}
        </BannerUpload>

        <RestaurantInfo>
          <h1>{restaurant.nome}</h1>
          <p>{restaurant.descricao}</p>
        </RestaurantInfo>
      </RestaurantHeader>

      <h2>Cardápio</h2>

      <MenuGrid>
        {dishes.map((dish) => (
          <DishCard key={dish.id}>
            <DishImage>
              {dish.imagem ? (
                <img src={dish.imagem} alt={dish.nome} />
              ) : (
                <div className="no-image">Sem imagem</div>
              )}
            </DishImage>
            <DishInfo>
              <h3>{dish.nome}</h3>
              <p className="price">{formatCurrency(dish.preco)}</p>
              <p className="description">{dish.descricao}</p>
            </DishInfo>
            <ActionButtons>
              <button onClick={() => handleEditDish(dish)}>
                <FaEdit /> Editar
              </button>
              <button onClick={() => handleDeleteDish(dish.id)}>
                <FaTrash /> Excluir
              </button>
            </ActionButtons>
          </DishCard>
        ))}
      </MenuGrid>

      <CompactForm onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Editar Prato' : 'Adicionar Prato'}</h3>

        <FormGroup>
          <Label>Imagem:</Label>
          <input type="file" id="dishImage" accept="image/*" onChange={handleImageChange} hidden />
          <ImageUploadButton htmlFor="dishImage">
            <FaImage /> {editedDish.imagemPreview ? 'Alterar Imagem' : 'Selecionar Imagem'}
          </ImageUploadButton>
          {editedDish.imagemPreview && (
            <img
              src={editedDish.imagemPreview}
              alt="Preview"
              style={{ width: '80px', marginTop: '10px', borderRadius: '4px' }}
            />
          )}
        </FormGroup>

        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={editedDish.nome}
            onChange={(e) => handleFieldChange(e, 'nome')}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Preço:</Label>
          <Input
            type="text"
            value={editedDish.preco}
            onChange={(e) => handleFieldChange(e, 'preco')}
            placeholder="R$ 0,00"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Descrição:</Label>
          <TextArea
            value={editedDish.descricao}
            onChange={(e) => handleFieldChange(e, 'descricao')}
            rows="3"
            required
          />
        </FormGroup>

        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <Button type="submit" primary>
            <FaCheck /> {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
          <Button type="button" onClick={resetForm}>
            <FaTimes /> Cancelar
          </Button>
        </div>
      </CompactForm>
    </Container>
  );
};

export default CadastrarPrato;
