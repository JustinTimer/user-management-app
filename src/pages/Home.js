import { Link, useNavigate } from "react-router-dom";

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        🚪 Logout
      </button>

      <div style={styles.heroSection}>
        <h1 style={styles.title}>User Management App</h1>
        <p style={styles.subtitle}>Manage, Register, and View User Information</p>
      </div>
      
      <div style={styles.cardsContainer}>
        <Link to="/display-users" style={{ textDecoration: "none" }}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📋 Display Users</h2>
            <p style={styles.cardText}>View all registered users and their details</p>
          </div>
        </Link>
        
        <Link to="/register-new-user" style={{ textDecoration: "none" }}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>➕ Register new user</h2>
            <p style={styles.cardText}>Add a new user to the system</p>
          </div>
        </Link>
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
    position: "relative"
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    background: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease"
  },
  heroSection: {
    textAlign: "center",
    color: "white",
    marginBottom: "60px"
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
  },
  subtitle: {
    fontSize: "1.2rem",
    opacity: "0.9"
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto"
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "transform 0.3s ease, boxShadow 0.3s ease",
    textAlign: "center"
  },
  cardTitle: {
    fontSize: "1.8rem",
    marginBottom: "15px",
    color: "#333"
  },
  cardText: {
    fontSize: "1rem",
    color: "#666",
    lineHeight: "1.5"
  }
};