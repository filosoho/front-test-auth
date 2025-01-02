import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    fetchUsers()
      .then((users) => {
        if (!users) {
          throw new Error("No users found");
        }
        const user = users.find((u) => u.username === username);
        if (user) {
          login(user);
          setSuccess("Login successful! Redirecting...");
          setError("");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setError("Incorrect user name");
          setSuccess("");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error logging in");
        setSuccess("");
      });
  };

  return (
    <section className="login-page">
      <h2>Login</h2>
      <div className="login-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default LoginPage;
