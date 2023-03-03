import React, { useState } from "react";
import TodoList from "../todoList/TodoList";
import "../../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  if (isAuthenticated) {
    return <TodoList />;
  } else {
    return (
      <div className="container-login">
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <h1 className="login-header">Login</h1>
                <label htmlFor="username">Usuario:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Iniciar sesión
            </button>
            {error && (
              <div className="alert-danger" role="alert">
                Usuario o contraseña incorrectos
              </div>
            )}{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
