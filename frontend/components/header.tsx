// components/header.tsx
import React, { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode; // optional
};

export default function Myheader({ children }: HeaderProps) {
  return (
    <header style={{ background: "#333", color: "#fff", padding: "10px 20px" }}>
      <nav>
        <a href="/" style={{ marginRight: "15px", color: "#fff" }}>Home</a>
        <a href="/about" style={{ marginRight: "15px", color: "#fff" }}>About</a>
        <a href="/contact" style={{ color: "#fff" }}>Contact</a>
      </nav>
      {children && <div>{children}</div>} {/* optional children render */}
    </header>
  );
}
