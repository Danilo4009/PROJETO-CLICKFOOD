// src/pages/Cadastrar Prato/index.js
import React, { useState, useCallback, useEffect } from 'react';
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
    preco: 0,
    descricao: '',
    imagem: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Carregar dados do restaurante e pratos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar dados do restaurante
        const restaurantResponse = await fetch(`http://localhost:3000/restaurantes/${id}`);
        const restaurantData = await restaurantResponse.json();
        setRestaurant(restaurantData);
        
        // Buscar pratos do restaurante
        const dishesResponse = await fetch(`http://localhost:3000/restaurantes/${id}/pratos`);
        const dishesData = await dishesResponse.json();
        setDishes(dishesData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    
    fetchData();
  }, [id]);

  const handleImageChange = (e, isBanner = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isBanner) {
        setRestaurant(prev => ({ ...prev, banner: reader.result }));
      } else {
        setEditedDish(prev => ({ ...prev, imagem: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '');
    const numberValue = parseFloat(digitsOnly) / 100 || 0;
    setEditedDish(prev => ({ ...prev, preco: numberValue }));
  };

  const handleFieldChange = (e, field) => {
    if (field === 'preco') {
      handlePriceChange(e);
    } else {
      setEditedDish(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const resetForm = () => {
    setEditedDish({ id: null, nome: '', preco: 0, descricao: '', imagem: '' });
    setIsEditing(false);
  };

  const handleEditDish = (dish) => {
    setEditedDish({ ...dish });
    setIsEditing(true);
  };

  const handleDeleteDish = async (dishId) => {
    if (window.confirm('Tem certeza que deseja excluir este prato?')) {
      try {
        await fetch(`http://localhost:3000/pratos/${dishId}`, { method: "DELETE" });
        setDishes(dishes.filter(dish => dish.id !== dishId));
        alert("Prato excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir prato:", error);
        alert("Erro ao tentar excluir o prato.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", editedDish.nome);
      formData.append("preco", editedDish.preco);
      formData.append("descricao", editedDish.descricao);
      formData.append("restauranteId", id);
      
      if (editedDish.imagem && typeof editedDish.imagem !== 'string') {
        formData.append("imagem", editedDish.imagem);
      }

      const url = isEditing 
        ? `http://localhost:3000/pratos/${editedDish.id}`
        : "http://localhost:3000/cadastrar-prato";
      
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, { method, body: formData });
      const result = await response.json();

      if (response.ok) {
        alert(isEditing ? "Prato atualizado!" : "Prato cadastrado!");
        if (isEditing) {
          setDishes(dishes.map(dish => dish.id === editedDish.id ? result : dish));
        } else {
          setDishes([...dishes, result]);
        }
        resetForm();
      } else {
        alert(result.message || "Erro ao salvar prato");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao tentar salvar o prato.");
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
        {dishes.map(dish => (
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
          <Label>Imagem do Prato:</Label>
          <input 
            type="file" 
            id="dishImage"
            accept="image/*" 
            onChange={(e) => handleImageChange(e)}
            hidden
          />
          <ImageUploadButton htmlFor="dishImage">
            <FaImage /> {editedDish.imagem ? 'Alterar Imagem' : 'Selecionar Imagem'}
          </ImageUploadButton>
          {editedDish.imagem && (
            <img 
              src={editedDish.imagem} 
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
            value={editedDish.preco === 0 ? '' : formatCurrency(editedDish.preco)}
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