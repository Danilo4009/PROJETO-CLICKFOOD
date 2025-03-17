import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Certifique-se de que este arquivo existe
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // Importação do arquivo correto

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se não quiser medir performance, pode remover esta linha
reportWebVitals();
