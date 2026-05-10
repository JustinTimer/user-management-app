import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createUser } from "../api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("M");
  const [birthdate, setBirthdate] = useState(new Date(2000, 0, 1));
  const [workAddress, setWorkAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addresses = [];
    if (workAddress.trim()) {
      addresses.push({ type: "WORK", address: workAddress.trim() });
    }
    if (homeAddress.trim()) {
      addresses.push({ type: "HOME", address: homeAddress.trim() });
    }

    const user = {
      name,
      surname,
      gender,
      birthdate: birthdate.toISOString().split("T")[0], // format YYYY-MM-DD
      addresses
    };

    try {
      await createUser(user);
      alert("User created successfully!");
      setName(""); setSurname(""); setGender("M"); setBirthdate(new Date()); setWorkAddress(""); setHomeAddress("");
    } catch (err) {
      console.error(err);
      alert("Error creating user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <button onClick={() => navigate("/")} style={styles.backButton}>← Back to Home</button>
        <h1 style={styles.title}>➕ Register New User</h1>
        <p style={styles.subtitle}>Fill in the form below to create a new user account</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input 
              type="text" 
              placeholder="Enter first name" 
              value={name} 
              required 
              onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, '').trim())}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Surname</label>
            <input 
              type="text" 
              placeholder="Enter last name" 
              value={surname} 
              required 
              onChange={(e) => setSurname(e.target.value.replace(/[^a-zA-Z\s]/g, '').trim())}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value)} 
              required
              style={styles.input}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Birthdate</label>
            <DatePicker 
              selected={birthdate} 
              onChange={(date) => setBirthdate(date)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Work Address (Optional)</label>
            <textarea 
              placeholder="Enter work address" 
              value={workAddress} 
              onChange={(e) => setWorkAddress(e.target.value)} 
              rows={3}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Home Address (Optional)</label>
            <textarea 
              placeholder="Enter home address" 
              value={homeAddress} 
              onChange={(e) => setHomeAddress(e.target.value)} 
              rows={3}
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>Register User</button>
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
    maxWidth: "500px"
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
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "1rem",
    fontFamily: "Arial, sans-serif",
    resize: "vertical",
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

export default Register;