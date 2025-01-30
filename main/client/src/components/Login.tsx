import { useState } from "react";
import { loginUser, signInWithGoogle, logoutUser } from "../firebase/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      await loginUser(email, password);
    } else {
      console.log("Please enter email and password");
    }
  };

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Login;
