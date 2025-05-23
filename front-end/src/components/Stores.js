// src/components/Stores.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Stores = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/restaurantes").then((res) => {
      setRestaurantes(res.data);
    });
  }, []);

  return (
    <div style={styles.container}>
      {restaurantes.map((restaurante) => (
        <Link 
          to={`/cadastrar-prato/${restaurante.id}`} 
          key={restaurante.id} 
          style={{ textDecoration: 'none' }}
        >
          <div style={styles.card}>
            {restaurante.imagem && (
              <img
                src={restaurante.imagem}
                alt={`Logo de ${restaurante.name}`}
                style={styles.image}
              />
            )}
            <p>{restaurante.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    width: "150px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
    }
  },
  image: {
    width: "100%",
    height: "100px",
    objectFit: "contain",
    marginBottom: "10px",
  },
};

export default Stores;