
import React from 'react';
import { NavbarContainer, Logo, HomeButton } from './styles/NavbarStyle'; 

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <img src="/assets/logo-clickfood.png" alt="Logo ClickFood" />
      </Logo>
      <HomeButton>Inicio</HomeButton>
    </NavbarContainer>
  );
};

export default Navbar;
