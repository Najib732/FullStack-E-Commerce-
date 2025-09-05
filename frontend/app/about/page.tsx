import React from "react";

export default function About() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
    fontFamily: "Helvetica, Arial, sans-serif",
    background: "linear-gradient(135deg, #ece9e6, #ffffff)", // soft classy gradient
    padding: "20px",
  };

  const cardStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.25)", // glassy effect
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    maxWidth: "500px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#1a1a1a",
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>About</h1>
        <p style={paragraphStyle}>
          Welcome to the About Page. This is designed with a classy glassmorphism style for a modern, elegant look.
        </p>
      </div>
    </div>
  );
}
