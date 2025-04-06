import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaPlus, FaCheck, FaTimes, FaEdit, FaTrash, 
  FaImage, FaShoppingCart, FaMinus 
} from 'react-icons/fa';
import { useCarrinho } from '../../components/contexts/CarrinhoContext';

// Função utilitária para garantir que o valor seja número
const ensureNumber = (value) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  return isNaN(num) ? 0 : num;
};

/* ========== COMPONENTES ESTILIZADOS ========== */
const PageContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  margin-top: -20px;
  overflow: hidden;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeaderContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 2;
`;

const CartButton = styled.button`
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
    background-color: white;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ea1d2c;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: -80px auto 0;
  padding: 30px;
  background: white;
  border-radius: 25px 25px 0 0;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
`;

const RestaurantTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 30px 0 20px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  background-color: #ea1d2c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #c41824;
    transform: scale(1.1);
  }
`;

const ClearButton = styled(AddButton)`
  background-color: #ff9800;
  margin-left: 10px;

  &:hover {
    background-color: #e68a00;
  }
`;

const DishesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const DishCard = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s;
  position: relative;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transform: translateY(-5px);
  }
`;

const DishImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const DishName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 5px;
  color: #333;
`;

const DishPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ea1d2c;
  margin: 5px 0;
`;

const DishDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

const DishActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background: rgba(255,255,255,0.8);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
  }
`;

const InfoContainer = styled.div`
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const InfoItem = styled.div`
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #ea1d2c;
  font-size: 1.1rem;
`;

const InfoValue = styled.span`
  display: block;
  color: #555;
  font-size: 1.05rem;
`;

const BackButton = styled.button`
  padding: 15px 30px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 40px;
  font-size: 1.1rem;
  transition: all 0.3s;
  display: block;
  width: 100%;
  font-weight: bold;
  
  &:hover {
    background-color: #e0e0e0;
    transform: translateY(-2px);
  }
`;

const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 60px;
  resize: vertical;
`;

const ImageUploadLabel = styled.label`
  display: block;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  margin: 5px 0;
  font-size: 0.9rem;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 150px;
  display: block;
  margin: 10px auto;
`;

const EditControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: 10px;
`;

const ControlButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:first-child {
    background-color: #4CAF50;
    color: white;
  }
  
  &:last-child {
    background-color: #f44336;
    color: white;
  }
`;

/* ========== MODAL DO CARRINHO ========== */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ItemList = styled.div`
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0 0 5px 0;
  color: #333;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  
  &:hover {
    color: #cc0000;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #388E3C;
  }
`;

/* ========== CONTROLES DE ADMIN ========== */
const AdminControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
`;

const AdminButton = styled.button`
  padding: 10px 15px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  
  &:hover {
    background-color: #cc0000;
  }
`;

/* ========== COMPONENTE PRINCIPAL ========== */
const Detalhes = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { 
    carrinho, 
    totalItens, 
    adicionarAoCarrinho, 
    removerDoCarrinho, 
    atualizarQuantidade,
    limparCarrinho
  } = useCarrinho();
  
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Temporariamente true para teste
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const restaurante = state?.restaurante || {
    nome: "The Japa Best Burger",
    email: "contato@japaburger.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Hamburguerias, 123 - Água Branca",
    cnpj: "12.345.678/0001-99",
    banner: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    pratos: [
      {
        id: 1,
        nome: "X-Burguer Especial",
        preco: 28.90,
        descricao: "Pão brioche, hambúrguer 180g, queijo, bacon e molho especial",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 2,
        nome: "Batata Frita",
        preco: 15.90,
        descricao: "Porção de batata frita crocante com cheddar e bacon",
        imagem: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      }
    ]
  };

  // Carregar pratos do localStorage
  const loadPratosFromLocalStorage = () => {
    const saved = localStorage.getItem(`cardapio_${restaurante.cnpj}`);
    return saved ? JSON.parse(saved) : null;
  };

  // Salvar pratos no localStorage
  const savePratosToLocalStorage = (pratosData) => {
    localStorage.setItem(`cardapio_${restaurante.cnpj}`, JSON.stringify(pratosData));
  };

  const [pratos, setPratos] = useState(() => {
    const savedPratos = loadPratosFromLocalStorage();
    if (savedPratos) {
      return savedPratos.map(p => ({ ...p, preco: ensureNumber(p.preco) }));
    }
    return restaurante.pratos?.map(p => ({ ...p, preco: ensureNumber(p.preco) })) || [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editedDish, setEditedDish] = useState({
    nome: '',
    preco: 0,
    descricao: '',
    imagem: ''
  });

  // Salvar automaticamente quando os pratos mudam
  useEffect(() => {
    savePratosToLocalStorage(pratos);
  }, [pratos, restaurante.cnpj]);

  // Função para remover esta loja
  const handleRemoveThisRestaurant = () => {
    if (window.confirm(`Tem certeza que deseja remover permanentemente o restaurante ${restaurante.nome}?`)) {
      // Remove do localStorage
      const lojasSalvas = JSON.parse(localStorage.getItem('lojasCadastradas')) || [];
      const lojasAtualizadas = lojasSalvas.filter(loja => loja.cnpj !== restaurante.cnpj);
      localStorage.setItem('lojasCadastradas', JSON.stringify(lojasAtualizadas));
      
      // Remove o cardápio específico
      localStorage.removeItem(`cardapio_${restaurante.cnpj}`);
      
      alert('Restaurante removido com sucesso!');
      navigate('/lojas');
    }
  };

  // Função para remover todas as lojas
  const handleRemoveAllRestaurants = () => {
    if (window.confirm('ATENÇÃO: Isso removerá TODOS os restaurantes cadastrados. Tem certeza?')) {
      localStorage.removeItem('lojasCadastradas');
      // Remove todos os cardápios
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cardapio_')) {
          localStorage.removeItem(key);
        }
      });
      alert('Todos os restaurantes foram removidos!');
      navigate('/lojas');
    }
  };

  // Funções para gerenciar pratos
  const handleAddDish = () => {
    const novoPrato = {
      id: Date.now(),
      nome: 'Novo Prato',
      preco: 0,
      descricao: 'Descrição do prato',
      imagem: 'https://via.placeholder.com/500x300?text=Novo+Prato'
    };
    setPratos([...pratos, novoPrato]);
    setEditingId(novoPrato.id);
    setEditedDish({ ...novoPrato });
  };

  const handleEditDish = (id) => {
    const pratoToEdit = pratos.find(prato => prato.id === id);
    setEditingId(id);
    setEditedDish({ 
      ...pratoToEdit,
      preco: ensureNumber(pratoToEdit.preco)
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedDish({});
  };

  const handleSaveDish = () => {
    const pratoAtualizado = {
      ...editedDish,
      preco: ensureNumber(editedDish.preco)
    };
    
    setPratos(pratos.map(prato => 
      prato.id === editingId ? pratoAtualizado : prato
    ));
    setEditingId(null);
    setEditedDish({});
  };

  const handleDeleteDish = (id) => {
    setPratos(pratos.filter(prato => prato.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditedDish({});
    }
  };

  const handleClearMenu = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o cardápio?')) {
      setPratos([]);
      localStorage.removeItem(`cardapio_${restaurante.cnpj}`);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedDish(prev => ({
        ...prev,
        imagem: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFieldChange = (e, field) => {
    const value = field === 'preco' 
      ? e.target.value // Deixamos como string temporariamente para permitir digitação
      : e.target.value;
    
    setEditedDish({
      ...editedDish,
      [field]: value
    });
  };

  // Função para calcular o total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + (ensureNumber(item.preco) * item.quantidade);
    }, 0).toFixed(2);
  };

  return (
    <PageContainer>
      <BannerContainer>
        {restaurante.banner ? (
          <BannerImage
            src={restaurante.banner}
            alt="Banner do Restaurante"
          />
        ) : (
          <div style={{
            backgroundColor: '#eee',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}>
            Sem imagem de banner
          </div>
        )}
        
        <HeaderContainer>
          <CartButton onClick={() => setShowCarrinho(true)}>
            <FaShoppingCart size={20} color="#333" />
            {totalItens > 0 && (
              <CartBadge>{totalItens}</CartBadge>
            )}
          </CartButton>
        </HeaderContainer>
      </BannerContainer>

      <ContentContainer>
        <RestaurantTitle>
          {restaurante.nome}
        </RestaurantTitle>

        <div>
          <SectionTitle>
            Cardápio
            <div>
              <AddButton onClick={handleAddDish}>
                <FaPlus size={20} />
              </AddButton>
              <ClearButton onClick={handleClearMenu}>
                <FaTrash size={16} />
              </ClearButton>
            </div>
          </SectionTitle>

          <DishesGrid>
            {pratos.map(prato => (
              <DishCard key={prato.id}>
                {editingId === prato.id ? (
                  <>
                    <ImageUploadLabel>
                      <FaImage /> Alterar Imagem
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </ImageUploadLabel>
                    {editedDish.imagem && (
                      <ImagePreview src={editedDish.imagem} alt="Preview" />
                    )}

                    <EditInput
                      type="text"
                      value={editedDish.nome}
                      onChange={(e) => handleFieldChange(e, 'nome')}
                      placeholder="Nome do prato"
                    />

                    <EditInput
                      type="text"
                      value={editedDish.preco}
                      onChange={(e) => handleFieldChange(e, 'preco')}
                      placeholder="Preço"
                    />

                    <EditTextarea
                      value={editedDish.descricao}
                      onChange={(e) => handleFieldChange(e, 'descricao')}
                      placeholder="Descrição do prato"
                    />

                    <EditControls>
                      <ControlButton onClick={handleSaveDish}>
                        <FaCheck /> Salvar
                      </ControlButton>
                      <ControlButton onClick={handleCancelEdit}>
                        <FaTimes /> Cancelar
                      </ControlButton>
                    </EditControls>
                  </>
                ) : (
                  <>
                    <DishImage src={prato.imagem} alt={prato.nome} />
                    <DishName>{prato.nome}</DishName>
                    <DishPrice>R$ {ensureNumber(prato.preco).toFixed(2)}</DishPrice>
                    <DishDescription>{prato.descricao}</DishDescription>
                    
                    <AddToCartButton onClick={() => adicionarAoCarrinho(prato)}>
                      <FaShoppingCart /> Adicionar
                    </AddToCartButton>
                    
                    <DishActions>
                      <ActionButton onClick={() => handleEditDish(prato.id)}>
                        <FaEdit size={14} />
                      </ActionButton>
                      <ActionButton onClick={() => handleDeleteDish(prato.id)}>
                        <FaTrash size={14} />
                      </ActionButton>
                    </DishActions>
                  </>
                )}
              </DishCard>
            ))}
          </DishesGrid>
        </div>

        <InfoContainer>
          <SectionTitle>Informações do Restaurante</SectionTitle>
          
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>{restaurante.email}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <InfoValue>{restaurante.telefone}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Endereço</InfoLabel>
            <InfoValue>{restaurante.endereco}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>CNPJ</InfoLabel>
            <InfoValue>{restaurante.cnpj}</InfoValue>
          </InfoItem>
        </InfoContainer>

        <BackButton onClick={() => navigate('/')}>Voltar para a lista</BackButton>
      </ContentContainer>

      {/* Modal do Carrinho */}
      <ModalOverlay show={showCarrinho}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Seu Carrinho</ModalTitle>
            <CloseButton onClick={() => setShowCarrinho(false)}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          
          <ItemList>
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio</p>
            ) : (
              carrinho.map(item => (
                <Item key={item.id}>
                  <ItemInfo>
                    <ItemName>{item.nome}</ItemName>
                    <ItemPrice>R$ {ensureNumber(item.preco).toFixed(2)}</ItemPrice>
                  </ItemInfo>
                  <ItemControls>
                    <QuantityButton onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>
                      <FaMinus size={10} />
                    </QuantityButton>
                    <span>{item.quantidade}</span>
                    <QuantityButton onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>
                      <FaPlus size={10} />
                    </QuantityButton>
                    <RemoveButton onClick={() => removerDoCarrinho(item.id)}>
                      <FaTrash />
                    </RemoveButton>
                  </ItemControls>
                </Item>
              ))
            )}
          </ItemList>
          
          {carrinho.length > 0 && (
            <>
              <TotalContainer>
                <span>Total:</span>
                <span>R$ {calcularTotal()}</span>
              </TotalContainer>
              <CheckoutButton onClick={() => {
                alert('Pedido finalizado com sucesso!');
                limparCarrinho();
                setShowCarrinho(false);
              }}>
                Finalizar Pedido
              </CheckoutButton>
            </>
          )}
        </ModalContent>
      </ModalOverlay>

      {/* Controles de Administrador */}
      {isAdmin && (
        <AdminControls>
          <AdminButton onClick={() => setShowAdminOptions(!showAdminOptions)}>
            <FaTrash /> Admin
          </AdminButton>

          {showAdminOptions && (
            <>
              <AdminButton onClick={handleRemoveThisRestaurant}>
                <FaTrash /> Remover Esta Loja
              </AdminButton>
              <AdminButton onClick={handleRemoveAllRestaurants}>
                <FaTrash /> Remover Todas
              </AdminButton>
            </>
          )}
        </AdminControls>
      )}
    </PageContainer>
  );
};

export default Detalhes;