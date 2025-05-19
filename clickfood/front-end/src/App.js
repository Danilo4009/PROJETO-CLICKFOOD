import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CarrinhoProvider } from "./components/contexts/CarrinhoContext";

import Header from "./components/Herder";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AppRoutes from "./Routes";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const actionLoginDataGoogle = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };

    setUser(newUser);
  };

  if (user === null) {
    return <Login onReceiveGoogle={actionLoginDataGoogle} />;
  }

  return (
    <BrowserRouter>
      <CarrinhoProvider>
        <Header user={user} />
        <AppRoutes />
        <Footer />
      </CarrinhoProvider>
    </BrowserRouter>
  );
}

export default App;
