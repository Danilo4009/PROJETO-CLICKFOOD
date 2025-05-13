import styled from 'styled-components';

// Função utilitária
export const ensureNumber = (value) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  return isNaN(num) ? 0 : num;
};

/* ========== COMPONENTES PRINCIPAIS ========== */
export const PageContainer = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;
`;

export const BannerContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  margin-top: -20px;
  overflow: hidden;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const HeaderContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 2;
`;

export const CartButton = styled.button`
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

export const CartBadge = styled.span`
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

export const ContentContainer = styled.div`
  max-width: 800px;
  margin: -80px auto 0;
  padding: 30px;
  background: white;
  border-radius: 25px 25px 0 0;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
`;

export const RestaurantTitle = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 25px;
  color: #333;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 30px 0 20px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddButton = styled.button`
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

export const ClearButton = styled(AddButton)`
  background-color: #ff9800;
  margin-left: 10px;

  &:hover {
    background-color: #e68a00;
  }
`;

export const DishesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const DishCard = styled.div`
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

export const DishImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const DishName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 5px;
  color: #333;
`;

export const DishPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ea1d2c;
  margin: 5px 0;
`;

export const DishDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
`;

export const DishActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
`;

export const ActionButton = styled.button`
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

export const AddToCartButton = styled.button`
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

export const InfoContainer = styled.div`
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

export const InfoItem = styled.div`
  margin: 20px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
  color: #ea1d2c;
  font-size: 1.1rem;
`;

export const InfoValue = styled.span`
  display: block;
  color: #555;
  font-size: 1.05rem;
`;

export const BackButton = styled.button`
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

export const EditInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const EditTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 60px;
  resize: vertical;
`;

export const ImageUploadLabel = styled.label`
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

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 150px;
  display: block;
  margin: 10px auto;
`;

export const EditControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: 10px;
`;

export const ControlButton = styled.button`
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

/* ========== MODAL ========== */
export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: #333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

export const ItemList = styled.div`
  margin-bottom: 20px;
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h4`
  margin: 0 0 5px 0;
  color: #333;
`;

export const ItemPrice = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuantityButton = styled.button`
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

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  
  &:hover {
    color: #cc0000;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-weight: bold;
`;

export const CheckoutButton = styled.button`
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

/* ========== ADMIN ========== */
export const AdminControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
`;

export const AdminButton = styled.button`
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