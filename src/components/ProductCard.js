import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState("yellow");
  const { name, price, popularityScore, images } = product;

  const fullScore = (popularityScore * 5).toFixed(1);

  const colorLabels = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold",
  };

  const getStars = (score) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(score * 5) ? "★" : "☆"
    );
  };

  return (
    <div
      style={{
        width: "225px",
        margin: "auto",
        padding: "0",
        textAlign: "left",
        fontFamily: "Avenir Book",
      }}
    >
      <img
        src={images[selectedColor]}
        alt={name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "12px",
        }}
      />

      <h4
        style={{
          fontFamily: "Montserrat Medium",
          fontSize: "15px",
          marginBottom: "4px",
        }}
      >
        {name}
      </h4>

      <p
        style={{
          fontFamily: "Montserrat Regular",
          fontSize: "15px",
          marginBottom: "12px",
        }}
      >
        ${Number(price).toFixed(2)} USD
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
        {["yellow", "white", "rose"].map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border:
                selectedColor === color ? "2px solid #000" : "1px solid #ccc",
              backgroundColor:
                color === "yellow"
                  ? "#E6C497"
                  : color === "white"
                  ? "#D9D9D9"
                  : "#E1A4A9",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: "Avenir Book",
          fontSize: "12px",
          color: "#888",
          marginBottom: "8px",
        }}
      >
        {colorLabels[selectedColor]}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ color: "#F5C48D", fontSize: "16px" }}>
          {getStars(popularityScore).map((star, i) => (
            <span key={i}>{star}</span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "Avenir Book",
            fontSize: "14px",
            color: "#555",
          }}
        >
          {fullScore}/5
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
