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
    <div className="login-container">
      <h2>Login</h2>
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
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-login-button"
        >
          Sign in with Google
        </button>
        <button type="button" onClick={logoutUser} className="logout-button">
          Logout
        </button>
      </form>
    </div>
  );
};

export default Login;