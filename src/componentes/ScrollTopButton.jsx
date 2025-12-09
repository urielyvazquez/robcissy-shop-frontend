// src/componentes/ScrollTopButton.jsx
import React from "react";

function ScrollTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)"
      }}
    >
      ↑ Arriba
    </button>
  );
}

export default ScrollTopButton;