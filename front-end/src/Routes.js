// src/Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CadastroRestaurante from "./pages/Cadastrar Restaurante";
import CadastroPrato from "./pages/Cadastrar Prato";
import Stores from "./components/Stores";
import Pagamentos from "./pages/Pagamentos"; 
import AcompanhamentoPedido from "./pages/Acompanhar_Pedido";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroRestaurante />} />
      <Route path="/cadastrar-prato/:id" element={<CadastroPrato />} />
      <Route path="/lojas" element={<Stores />} />
      <Route path="/pagamento" element={<Pagamentos />} />
      <Route path="/acompanhamento" element={<AcompanhamentoPedido />} />
    </Routes>
  );
};

export default AppRoutes;