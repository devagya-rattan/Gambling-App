import { useState } from "react";
import { registerUser } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (email && password) {
      await registerUser(email, password);
      navigate("/login");
    } else {
      console.log("Please enter email and password");
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleRegister} className="login-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;