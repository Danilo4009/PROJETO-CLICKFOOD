// src/pages/Cadastrar Prato/styled.js
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 14px;
`;

export const RestaurantHeader = styled.div`
  margin-bottom: 30px;
`;

export const BannerUpload = styled.div`
  width: 100%;
  height: 150px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    background: #e63946;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RestaurantInfo = styled.div`
  text-align: center;

  h1 {
    margin: 0;
    color: #333;
    font-size: 24px;
  }

  p {
    color: #666;
    margin-top: 5px;
    font-size: 14px;
  }
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const DishCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  }
`;

export const DishImage = styled.div`
  height: 120px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    color: #999;
    font-size: 14px;
  }
`;

export const DishInfo = styled.div`
  padding: 12px;
  flex-grow: 1;

  h3 {
    margin: 0 0 8px 0;
    color: #333;
    font-size: 16px;
  }

  .price {
    font-weight: bold;
    color: #e63946;
    margin: 5px 0;
    font-size: 15px;
  }

  .description {
    color: #666;
    font-size: 13px;
    margin: 5px 0;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 8px;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 6px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 13px;
    transition: background 0.2s;

    &:first-child {
      color: #2a9d8f;
      border-right: 1px solid #eee;
    }

    &:last-child {
      color: #e63946;
    }

    &:hover {
      background: #f9f9f9;
    }
  }
`;

export const CompactForm = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  background: ${props => props.primary ? '#e63946' : '#ccc'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  background: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e0e0e0;
  }
`;