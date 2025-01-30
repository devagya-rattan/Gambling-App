import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, UserCredential } from "firebase/auth";
import { app } from "../firebase";

// Initialize Firebase Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Register user with email and password
export const registerUser = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// Login user with email and password
export const loginUser = async (email: string, password: string): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

// Login with Google
export const signInWithGoogle = async (): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
