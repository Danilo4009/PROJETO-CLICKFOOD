import React from "react";

const storesData = [
  {
    id: 1,
    name: "Vip Sushi - Osasco",
    image: require("../assets/vipsushi.png"),
  },
  {
    id: 2,
    name: "Mc Donalds",
    image: require("../assets/mcDonalds.png"),
  },
  {
    id: 3,
    name: "Burguer-King",
    image: require("../assets/burguerking.png"),
  },
];

const Stores = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Últimas lojas</h2>
      <div style={styles.storesList}>
        {storesData.map((store) => (
          <div key={store.id} style={styles.storeCard}>
            <img src={store.image} alt={store.name} style={styles.storeImage} />
            <p style={styles.storeName}>{store.name}</p>
          </div>
        ))}
      </div>

      {/* Substituindo <a> por um <button> para evitar o erro */}
      <button
        style={styles.viewMore}
        onClick={() => console.log("Clique em Ver mais")}
      >
        Ver mais
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  storesList: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },
  storeCard: {
    width: "150px",
    height: "85px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  storeImage: {
    width: "50%",
    height: "60px",
    objectFit: "cover",
    borderRadius: "2px",
  },
  storeName: {
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  viewMore: {
    display: "block",
    textAlign: "center",
    color: "red",
    marginTop: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Stores;
