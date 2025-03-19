
import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinha os itens à esquerda */
  align-items: center;
  padding: 5px 20px; /* Ajusta o padding para diminuir a altura */
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 45px; /* Diminui a altura da Navbar para 45px */
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 20px;

  img {
    height: 35px; /* Aumenta a altura da logo para 35px */
    width: auto;
  }
`;

export const HomeButton = styled.button`
  padding: 5px 12px; /* Ajusta o padding do botão */
  background-color: #fff; /* Define fundo branco */
  color: #333; /* Define a cor do texto como preto */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px; /* Tamanho da fonte */
  font-weight: 600; /* Tornando a fonte mais grossa (600 = semi-bold) */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff3d2f;
    color: white; /* Altera a cor do texto quando passar o mouse */
  }
`;
