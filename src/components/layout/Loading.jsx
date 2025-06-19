// src/components/LoadingScreen.jsx
import React from "react";
import "./loading.css";

export default function LoadingScreen({text}) {
  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
