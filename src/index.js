import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';  // Importando o BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Envolvendo o App com o BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Se quiser medir o desempenho, passe uma função para registrar os resultados
// ou envie para um endpoint de análise. Saiba mais: https://bit.ly/CRA-vitals
reportWebVitals();
