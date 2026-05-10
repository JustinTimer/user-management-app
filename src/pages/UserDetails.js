import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/display-users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <div style={styles.container}><p style={styles.loadingText}>Loading...</p></div>;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <button onClick={() => navigate("/display-users")} style={styles.backButton}>← Back to Users</button>
        
        <h1 style={styles.title}>👤 {user.name} {user.surname}</h1>
        
        <div style={styles.detailsCard}>
          <div style={styles.detailGroup}>
            <span style={styles.label}>Gender:</span>
            <span style={styles.value}>{user.gender === 'M' ? 'Male' : 'Female'}</span>
          </div>
          
          <div style={styles.detailGroup}>
            <span style={styles.label}>Birthdate:</span>
            <span style={styles.value}>{new Date(user.birthdate).toLocaleDateString()}</span>
          </div>
        </div>

        {user.addresses && user.addresses.length > 0 && (
          <div style={styles.addressesSection}>
            <h2 style={styles.sectionTitle}>📍 Addresses</h2>
            <div style={styles.addressesContainer}>
              {user.addresses.map(a => (
                <div key={a.id} style={styles.addressCard}>
                  <span style={styles.addressType}>{a.type}</span>
                  <p style={styles.addressText}>{a.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif"
  },
  loadingText: {
    color: "white",
    fontSize: "1.2rem",
    textAlign: "center"
  },
  wrapper: {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    maxWidth: "700px",
    margin: "0 auto"
  },
  backButton: {
    padding: "10px 20px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "background-color 0.3s ease"
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "30px",
    textAlign: "center"
  },
  detailsCard: {
    background: "#f8f9fa",
    borderRadius: "10px",
    padding: "25px",
    marginBottom: "30px",
    border: "2px solid #e0e0e0"
  },
  detailGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #ddd"
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "1.05rem"
  },
  value: {
    color: "#667eea",
    fontSize: "1.05rem"
  },
  addressesSection: {
    marginTop: "30px"
  },
  sectionTitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "20px",
    borderBottom: "2px solid #667eea",
    paddingBottom: "10px"
  },
  addressesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px"
  },
  addressCard: {
    background: "#f8f9fa",
    borderRadius: "10px",
    padding: "20px",
    border: "2px solid #667eea",
    transition: "transform 0.3s ease, boxShadow 0.3s ease"
  },
  addressType: {
    display: "inline-block",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "0.85rem",
    marginBottom: "10px"
  },
  addressText: {
    color: "#333",
    fontSize: "0.95rem",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  }
};