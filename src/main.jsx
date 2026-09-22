import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="540046084193-cc03lat230l6cd9i231d9f4gqlslcml9.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);