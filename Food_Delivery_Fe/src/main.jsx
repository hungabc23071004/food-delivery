import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css"; // Ensure you have your Tailwind CSS imported
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
