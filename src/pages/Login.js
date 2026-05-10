import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin") {
      onLogin();
    } else {
      setError("Invalid username or password");
      setPassword("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>🔐 Login</h1>
        <p style={styles.subtitle}>Enter your credentials to access the application</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  formWrapper: {
    background: "white",
    borderRadius: "12px",
    padding: "50px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    textAlign: "center",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "0.95rem"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box"
  },
  button: {
    padding: "14px 30px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s ease, boxShadow 0.2s ease",
    marginTop: "10px"
  },
  error: {
    color: "#ff4757",
    fontSize: "0.95rem",
    textAlign: "center",
    margin: "0"
  }
};

export default Login;
