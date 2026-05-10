import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      console.log("API Response:", res);
      console.log("res.data:", res.data);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <button onClick={() => navigate("/")} style={styles.backButton}>← Back to Home</button>
        <h1 style={styles.title}>📋 Display Users</h1>
        <p style={styles.subtitle}>View all registered users - Click on a user to see details</p>
        
        {users.length === 0 ? (
          <p style={styles.emptyMessage}>No users found. <a href="/register-new-user" style={styles.link}>Register a new user</a></p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.headerRow}>
                  <th style={styles.headerCell}>Name</th>
                  <th style={styles.headerCell}>Surname</th>
                  <th style={styles.headerCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr 
                    key={u.id} 
                    onClick={() => navigate(`/display-users/${u.id}`)} 
                    style={styles.bodyRow}
                  >
                    <td style={styles.cell}>{u.name}</td>
                    <td style={styles.cell}>{u.surname}</td>
                    <td style={styles.actionCell} onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => handleDelete(u.id)} 
                        style={styles.deleteButton}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  wrapper: {
    background: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    maxWidth: "1000px",
    margin: "0 auto"
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
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.1rem",
    padding: "40px"
  },
  link: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "bold"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  },
  headerRow: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  headerCell: {
    padding: "16px",
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: "1rem"
  },
  bodyRow: {
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    borderBottom: "1px solid #e0e0e0"
  },
  cell: {
    padding: "14px 16px",
    color: "#333"
  },
  actionCell: {
    padding: "14px 16px",
    textAlign: "left"
  },
  deleteButton: {
    padding: "8px 16px",
    background: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease"
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
  }
};

export default Users;