import React, { useState, useEffect } from "react";
import banner1 from "../assets/cupom2.jpg";
import banner2 from "../assets/entrega2.jpg";
import banner3 from "../assets/parceiro3.jpg";

const images = [banner1, banner2, banner3];

const Banner = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.bannerContainer}>
        <img src={images[currentIndex]} alt="Banner" style={styles.image} />
      </div>

      {/* Controles abaixo do banner */}
      <div style={styles.controlsContainer}>
        <button style={styles.navButton} onClick={goToPrevious}>
          &#10094;
        </button>

        {/* Indicadores */}
        <div style={styles.indicatorsContainer}>
          {images.map((_, index) => (
            <span
              key={index}
              style={{
                ...styles.indicator,
                backgroundColor: currentIndex === index ? "#fff" : "#888",
              }}
            />
          ))}
        </div>

        <button style={styles.navButton} onClick={goToNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bannerContainer: {
    width: "100%",
    height: "370px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
    transition: "opacity 0.5s ease-in-out",
  },
  controlsContainer: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  navButton: {
    background: "#333",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "background 0.3s ease",
  },
  indicatorsContainer: {
    display: "flex",
    gap: "8px",
  },
  indicator: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

export default Banner;
