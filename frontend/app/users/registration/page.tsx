"use client";

import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ name: "", email: "", phone: "" });
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "420px",
    margin: "60px auto",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle: React.CSSProperties = {
    padding: "12px 15px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border 0.2s, box-shadow 0.2s",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0,123,255,0.5)",
    outline: "none",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.2s",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#0056b3",
  };

  const cardStyle: React.CSSProperties = {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
  };

  const [inputFocus, setInputFocus] = useState({
    name: false,
    email: false,
    phone: false,
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px" }}>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ ...inputStyle, ...(inputFocus.name ? inputFocusStyle : {}) }}
         
          required
        />

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ ...inputStyle, ...(inputFocus.email ? inputFocusStyle : {}) }}
       
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={{ ...inputStyle, ...(inputFocus.phone ? inputFocusStyle : {}) }}
          required
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => ((e.currentTarget.style.backgroundColor = "#0056b3"))}
          onMouseOut={(e) => ((e.currentTarget.style.backgroundColor = "#007bff"))}
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>Submitted Data:</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
        </div>
      )}
    </div>
  );
}
