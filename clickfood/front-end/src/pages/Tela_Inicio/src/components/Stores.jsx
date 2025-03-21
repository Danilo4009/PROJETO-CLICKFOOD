import React from "react";
import "../styles/Stores.css";
import mcDonalds from "../assets/mcDonalds.png";
import baixinho from "../assets/baixinho.jpg";
import vipsushi from "../assets/vipsushi.png";
import saboraldeia from "../assets/saboraldeia.png";
import burguerking from "../assets/burguerking.png";
import sodie from "../assets/sodie.jpeg";

function Stores() {
  const stores = [
    {
      name: "Restaurante do Baixinho",
      image: baixinho,
    },
    {
      name: "Vip Sushi",
      image: vipsushi,
    },
    {
      name: "Sabor da Aldeia",
      image: saboraldeia,
    },
    {
      name: "McDonald's",
      image: mcDonalds,
    },
    {
      name: "Burguer King",
      image: burguerking,
    },
    {
      name: "Sodie Doces",
      image: sodie,
    },
  ];

  return (
    <div className="stores">
      {stores.map((store, index) => (
        <div key={index} className="store-item">
          <img src={store.image} alt={store.name} className="store-image" />
          <span className="store-name">{store.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stores;
