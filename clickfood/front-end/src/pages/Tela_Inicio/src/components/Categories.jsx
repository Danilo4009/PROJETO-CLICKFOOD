import React from "react";
import "../styles/Categories.css";

function Categories() {
  const categories = ["Restaurantes", "Bebidas"];

  return (
    <div className="categories">
      {categories.map((cat, index) => (
        <div key={index} className="category-item">
          {cat}
        </div>
      ))}
    </div>
  );
}

export default Categories;
