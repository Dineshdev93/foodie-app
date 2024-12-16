import React from "react";

export default function Errorpage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src="./error.avif" alt="error" />
      <div className="mb-5">
        <a
          href="/"
          style={{
            textDecoration: "none",
            letterSpacing: "1px",
            fontSize: "20px",
            borderBottom: "1px solid",
            fontWeight: "500",
          }}
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
