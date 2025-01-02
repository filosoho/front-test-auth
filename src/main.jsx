import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App.jsx";
import { ArticlesProvider } from "./contexts/ArticlesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <ArticlesProvider>
            <App />
          </ArticlesProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
