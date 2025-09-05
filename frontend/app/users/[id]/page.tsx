"use client";

import { use } from "react";
import React from "react";

export default function UserId({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    backgroundColor: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
    padding: "30px",
  };

  const cardStyle: React.CSSProperties = {
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  };

  const idStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#007bff",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Hello User</h1>
        <p>Your User ID is:</p>
        <p style={idStyle}>{id}</p>
      </div>
    </div>
  );
}
