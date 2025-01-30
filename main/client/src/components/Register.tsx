import { useState } from "react";
import { registerUser } from "../firebase/authService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (email && password) {
      await registerUser(email, password);
    } else {
      console.log("Please enter email and password");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
