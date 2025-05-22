// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { 
//   FaPlus, FaCheck, FaTimes, FaEdit, FaTrash, 
//   FaImage, FaShoppingCart, FaMinus 
// } from 'react-icons/fa';
// import { useCarrinho } from '../../components/contexts/CarrinhoContext';
// import * as S from './styled';

// const Detalhes = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { 
//     carrinho, 
//     totalItens, 
//     adicionarAoCarrinho, 
//     removerDoCarrinho, 
//     atualizarQuantidade,
//     limparCarrinho
//   } = useCarrinho();
  
//   const [showCarrinho, setShowCarrinho] = useState(false);
//   const isAdmin = true;

//   // Objeto restaurante memoizado
//   const restaurante = useMemo(() => state?.restaurante || {
//     nome: "The Japa Best Burger",
//     email: "contato@japaburger.com",
//     telefone: "(11) 98765-4321",
//     endereco: "Rua das Hamburguerias, 123 - Água Branca",
//     cnpj: "12.345.678/0001-99",
//     banner: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     pratos: [
//       {
//         id: 1,
//         nome: "X-Burguer Especial",
//         preco: 28.90,
//         descricao: "Pão brioche, hambúrguer 180g, queijo, bacon e molho especial",
//         imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//       },
//       {
//         id: 2,
//         nome: "Batata Frita",
//         preco: 15.90,
//         descricao: "Porção de batata frita crocante com cheddar e bacon",
//         imagem: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//       }
//     ]
//   }, [state]);

//   // Carregar pratos do localStorage
//   const loadPratosFromLocalStorage = useCallback(() => {
//     const saved = localStorage.getItem(`cardapio_${restaurante.cnpj}`);
//     return saved ? JSON.parse(saved) : null;
//   }, [restaurante.cnpj]);

//   // Salvar pratos no localStorage
//   const savePratosToLocalStorage = useCallback((pratosData) => {
//     localStorage.setItem(`cardapio_${restaurante.cnpj}`, JSON.stringify(pratosData));
//   }, [restaurante.cnpj]);

//   const [pratos, setPratos] = useState(() => {
//     const savedPratos = loadPratosFromLocalStorage();
//     if (savedPratos) {
//       return savedPratos.map(p => ({ ...p, preco: S.ensureNumber(p.preco) }));
//     }
//     return restaurante.pratos?.map(p => ({ ...p, preco: S.ensureNumber(p.preco) })) || [];
//   });

//   const [editingId, setEditingId] = useState(null);
//   const [editedDish, setEditedDish] = useState({
//     nome: '',
//     preco: 0,
//     descricao: '',
//     imagem: ''
//   });

//   const [showAdminOptions, setShowAdminOptions] = useState(false);

//   useEffect(() => {
//     savePratosToLocalStorage(pratos);
//   }, [pratos, savePratosToLocalStorage]);

//   const handleRemoveThisRestaurant = useCallback(() => {
//     if (window.confirm(`Tem certeza que deseja remover permanentemente o restaurante ${restaurante.nome}?`)) {
//       const lojasSalvas = JSON.parse(localStorage.getItem('lojasCadastradas')) || [];
//       const lojasAtualizadas = lojasSalvas.filter(loja => loja.cnpj !== restaurante.cnpj);
//       localStorage.setItem('lojasCadastradas', JSON.stringify(lojasAtualizadas));
//       localStorage.removeItem(`cardapio_${restaurante.cnpj}`);
//       alert('Restaurante removido com sucesso!');
//       navigate('/lojas');
//     }
//   }, [restaurante, navigate]);

//   const handleRemoveAllRestaurants = useCallback(() => {
//     if (window.confirm('ATENÇÃO: Isso removerá TODOS os restaurantes cadastrados. Tem certeza?')) {
//       localStorage.removeItem('lojasCadastradas');
//       Object.keys(localStorage).forEach(key => {
//         if (key.startsWith('cardapio_')) {
//           localStorage.removeItem(key);
//         }
//       });
//       alert('Todos os restaurantes foram removidos!');
//       navigate('/lojas');
//     }
//   }, [navigate]);

//   const handleAddDish = useCallback(() => {
//     const novoPrato = {
//       id: Date.now(),
//       nome: 'Novo Prato',
//       preco: 0,
//       descricao: 'Descrição do prato',
//       imagem: 'https://via.placeholder.com/500x300?text=Novo+Prato'
//     };
//     setPratos([...pratos, novoPrato]);
//     setEditingId(novoPrato.id);
//     setEditedDish({ ...novoPrato });
//   }, [pratos]);

//   const handleEditDish = useCallback((id) => {
//     const pratoToEdit = pratos.find(prato => prato.id === id);
//     setEditingId(id);
//     setEditedDish({ 
//       ...pratoToEdit,
//       preco: S.ensureNumber(pratoToEdit.preco)
//     });
//   }, [pratos]);

//   const handleCancelEdit = useCallback(() => {
//     setEditingId(null);
//     setEditedDish({});
//   }, []);

//   const handleSaveDish = useCallback(() => {
//     const pratoAtualizado = {
//       ...editedDish,
//       preco: S.ensureNumber(editedDish.preco)
//     };
    
//     setPratos(pratos.map(prato => 
//       prato.id === editingId ? pratoAtualizado : prato
//     ));
//     setEditingId(null);
//     setEditedDish({});
//   }, [editedDish, editingId, pratos]);

//   const handleDeleteDish = useCallback((id) => {
//     setPratos(pratos.filter(prato => prato.id !== id));
//     if (editingId === id) {
//       setEditingId(null);
//       setEditedDish({});
//     }
//   }, [editingId, pratos]);

//   const handleClearMenu = useCallback(() => {
//     if (window.confirm('Tem certeza que deseja limpar todo o cardápio?')) {
//       setPratos([]);
//       localStorage.removeItem(`cardapio_${restaurante.cnpj}`);
//     }
//   }, [restaurante.cnpj]);

//   const handleImageChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setEditedDish(prev => ({
//         ...prev,
//         imagem: reader.result
//       }));
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const handleFieldChange = useCallback((e, field) => {
//     const value = field === 'preco' ? e.target.value : e.target.value;
//     setEditedDish(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   }, []);

//   const calcularTotal = useCallback(() => {
//     return carrinho.reduce((total, item) => {
//       return total + (S.ensureNumber(item.preco) * item.quantidade);
//     }, 0).toFixed(2);
//   }, [carrinho]);

//   return (
//     <S.PageContainer>
//       <S.BannerContainer>
//         {restaurante.banner ? (
//           <S.BannerImage src={restaurante.banner} alt="Banner do Restaurante" />
//         ) : (
//           <div style={{
//             backgroundColor: '#eee',
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             color: '#999'
//           }}>
//             Sem imagem de banner
//           </div>
//         )}
        
//         <S.HeaderContainer>
//           <S.CartButton onClick={() => setShowCarrinho(true)}>
//             <FaShoppingCart size={20} color="#333" />
//             {totalItens > 0 && <S.CartBadge>{totalItens}</S.CartBadge>}
//           </S.CartButton>
//         </S.HeaderContainer>
//       </S.BannerContainer>

//       <S.ContentContainer>
//         <S.RestaurantTitle>{restaurante.nome}</S.RestaurantTitle>

//         <div>
//           <S.SectionTitle>
//             Cardápio
//             <div>
//               <S.AddButton onClick={handleAddDish}>
//                 <FaPlus size={20} />
//               </S.AddButton>
//               <S.ClearButton onClick={handleClearMenu}>
//                 <FaTrash size={16} />
//               </S.ClearButton>
//             </div>
//           </S.SectionTitle>

//           <S.DishesGrid>
//             {pratos.map(prato => (
//               <S.DishCard key={prato.id}>
//                 {editingId === prato.id ? (
//                   <>
//                     <S.ImageUploadLabel>
//                       <FaImage /> Alterar Imagem
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         style={{ display: 'none' }}
//                       />
//                     </S.ImageUploadLabel>
//                     {editedDish.imagem && (
//                       <S.ImagePreview src={editedDish.imagem} alt="Preview" />
//                     )}

//                     <S.EditInput
//                       type="text"
//                       value={editedDish.nome}
//                       onChange={(e) => handleFieldChange(e, 'nome')}
//                       placeholder="Nome do prato"
//                     />

//                     <S.EditInput
//                       type="text"
//                       value={editedDish.preco}
//                       onChange={(e) => handleFieldChange(e, 'preco')}
//                       placeholder="Preço"
//                     />

//                     <S.EditTextarea
//                       value={editedDish.descricao}
//                       onChange={(e) => handleFieldChange(e, 'descricao')}
//                       placeholder="Descrição do prato"
//                     />

//                     <S.EditControls>
//                       <S.ControlButton onClick={handleSaveDish}>
//                         <FaCheck /> Salvar
//                       </S.ControlButton>
//                       <S.ControlButton onClick={handleCancelEdit}>
//                         <FaTimes /> Cancelar
//                       </S.ControlButton>
//                     </S.EditControls>
//                   </>
//                 ) : (
//                   <>
//                     <S.DishImage src={prato.imagem} alt={prato.nome} />
//                     <S.DishName>{prato.nome}</S.DishName>
//                     <S.DishPrice>R$ {S.ensureNumber(prato.preco).toFixed(2)}</S.DishPrice>
//                     <S.DishDescription>{prato.descricao}</S.DishDescription>
                    
//                     <S.AddToCartButton onClick={() => adicionarAoCarrinho(prato)}>
//                       <FaShoppingCart /> Adicionar
//                     </S.AddToCartButton>
                    
//                     <S.DishActions>
//                       <S.ActionButton onClick={() => handleEditDish(prato.id)}>
//                         <FaEdit size={14} />
//                       </S.ActionButton>
//                       <S.ActionButton onClick={() => handleDeleteDish(prato.id)}>
//                         <FaTrash size={14} />
//                       </S.ActionButton>
//                     </S.DishActions>
//                   </>
//                 )}
//               </S.DishCard>
//             ))}
//           </S.DishesGrid>
//         </div>

//         <S.InfoContainer>
//           <S.SectionTitle>Informações do Restaurante</S.SectionTitle>
          
//           <S.InfoItem>
//             <S.InfoLabel>Email</S.InfoLabel>
//             <S.InfoValue>{restaurante.email}</S.InfoValue>
//           </S.InfoItem>

//           <S.InfoItem>
//             <S.InfoLabel>Telefone</S.InfoLabel>
//             <S.InfoValue>{restaurante.telefone}</S.InfoValue>
//           </S.InfoItem>

//           <S.InfoItem>
//             <S.InfoLabel>Endereço</S.InfoLabel>
//             <S.InfoValue>{restaurante.endereco}</S.InfoValue>
//           </S.InfoItem>

//           <S.InfoItem>
//             <S.InfoLabel>CNPJ</S.InfoLabel>
//             <S.InfoValue>{restaurante.cnpj}</S.InfoValue>
//           </S.InfoItem>
//         </S.InfoContainer>

//         <S.BackButton onClick={() => navigate('/')}>Voltar para a lista</S.BackButton>
//       </S.ContentContainer>

//       {/* Modal do Carrinho */}
//       <S.ModalOverlay show={showCarrinho}>
//         <S.ModalContent>
//           <S.ModalHeader>
//             <S.ModalTitle>Seu Carrinho</S.ModalTitle>
//             <S.CloseButton onClick={() => setShowCarrinho(false)}>
//               <FaTimes />
//             </S.CloseButton>
//           </S.ModalHeader>
          
//           <S.ItemList>
//             {carrinho.length === 0 ? (
//               <p>Seu carrinho está vazio</p>
//             ) : (
//               carrinho.map(item => (
//                 <S.Item key={item.id}>
//                   <S.ItemInfo>
//                     <S.ItemName>{item.nome}</S.ItemName>
//                     <S.ItemPrice>R$ {S.ensureNumber(item.preco).toFixed(2)}</S.ItemPrice>
//                   </S.ItemInfo>
//                   <S.ItemControls>
//                     <S.QuantityButton onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>
//                       <FaMinus size={10} />
//                     </S.QuantityButton>
//                     <span>{item.quantidade}</span>
//                     <S.QuantityButton onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>
//                       <FaPlus size={10} />
//                     </S.QuantityButton>
//                     <S.RemoveButton onClick={() => removerDoCarrinho(item.id)}>
//                       <FaTrash />
//                     </S.RemoveButton>
//                   </S.ItemControls>
//                 </S.Item>
//               ))
//             )}
//           </S.ItemList>
          
//           {carrinho.length > 0 && (
//             <>
//               <S.TotalContainer>
//                 <span>Total:</span>
//                 <span>R$ {calcularTotal()}</span>
//               </S.TotalContainer>
//               <S.CheckoutButton onClick={() => {
//                 alert('Pedido finalizado com sucesso!');
//                 limparCarrinho();
//                 setShowCarrinho(false);
//               }}>
//                 Finalizar Pedido
//               </S.CheckoutButton>
//             </>
//           )}
//         </S.ModalContent>
//       </S.ModalOverlay>

//       {/* Controles de Administrador */}
//       {isAdmin && (
//         <S.AdminControls>
//           <S.AdminButton onClick={() => setShowAdminOptions(!showAdminOptions)}>
//             <FaTrash /> Admin
//           </S.AdminButton>

//           {showAdminOptions && (
//             <>
//               <S.AdminButton onClick={handleRemoveThisRestaurant}>
//                 <FaTrash /> Remover Esta Loja
//               </S.AdminButton>
//               <S.AdminButton onClick={handleRemoveAllRestaurants}>
//                 <FaTrash /> Remover Todas
//               </S.AdminButton>
//             </>
//           )}
//         </S.AdminControls>
//       )}
//     </S.PageContainer>
//   );
// };

// export default Detalhes;