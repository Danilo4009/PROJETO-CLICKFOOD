import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CadastroRestaurante from "./pages/Restaurantes/cadastro";
import Detalhes from "./pages/Restaurantes/Detalhes.js";
import Stores from "./components/Stores";
import Pagamentos from "./pages/Pagamentos"; // Nova importação
import AcompanhamentoPedido from "./pages/Acompanhar_Pedido";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroRestaurante />} />
      <Route path="/detalhes" element={<Detalhes />} />
      <Route path="/lojas" element={<Stores />} />
      <Route path="/pagamento" element={<Pagamentos />} /> {/* Nova rota */}
      <Route path="/acompanhamento" element={<AcompanhamentoPedido />} />
    </Routes>
  );
};

export default AppRoutes;
