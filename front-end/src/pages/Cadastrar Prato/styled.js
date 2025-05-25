import styled from 'styled-components';

// Paleta principal
const primary = '#e63946';
const lightGray = '#f5f5f5';
const darkGray = '#333';
const mediumGray = '#666';
const borderColor = '#ddd';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 2px solid ${borderColor};
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: 500;
  color: ${darkGray};
`;

export const RestaurantHeader = styled.div`
  margin-bottom: 30px;
`;

export const BannerUpload = styled.div`
  width: 100%;
  height: 180px;
  background: ${lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 12px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: ${primary};
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;

    &:hover {
      background: #d62839;
    }
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
    color: ${darkGray};
    font-size: 26px;
  }

  p {
    color: ${mediumGray};
    margin-top: 6px;
    font-size: 15px;
  }
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const DishCard = styled.div`
  border: 1px solid ${borderColor};
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  background: #fff;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
`;

export const DishImage = styled.div`
  height: 140px;
  background: ${lightGray};
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
    margin: 0 0 8px;
    color: ${darkGray};
    font-size: 17px;
  }

  .price {
    font-weight: bold;
    color: ${primary};
    margin-bottom: 4px;
  }

  .description {
    font-size: 14px;
    color: ${mediumGray};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background: #fafafa;
  border-top: 1px solid ${borderColor};

  button {
    background: none;
    border: none;
    color: ${primary};
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CompactForm = styled.form`
  background: #fff;
  padding: 20px;
  border: 1px solid ${borderColor};
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;

  h3 {
    margin-bottom: 15px;
    color: ${darkGray};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
  color: ${darkGray};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${borderColor};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${primary};
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${borderColor};
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${primary};
    box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.2);
  }
`;

export const Button = styled.button`
  background: ${(props) => (props.primary ? primary : '#ccc')};
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.primary ? '#d62839' : '#bbb')};
  }
`;

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${primary};
  color: white;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background: #d62839;
  }
`;
