import React from "react";

function Header({ title, subtitle }) {
  return (
    <header style={{ textAlign: "center", marginBottom: 20 }}>
      <h1>{title}</h1>
      {subtitle && <p style={{ marginTop: 5, color: "#555" }}>{subtitle}</p>}
    </header>
  );
}

export default Header;
