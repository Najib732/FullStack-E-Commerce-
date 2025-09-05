// components/footer.tsx
import React from "react";

export default function Footer() {
  return (
  <div className="flex flex-col min-h-screen">

  <footer style={{ background: "#111", color: "#fff", padding: "24px 16px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "0.875rem", marginBottom: "12px" }}>
          &copy; 2025 Najib's Fake Info. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Terms of Service</a>
          <a href="#" style={{ color: "#ccc", textDecoration: "none" }}>Contact</a>
        </div>
      </div>
    </footer>

</div>


  );
}
