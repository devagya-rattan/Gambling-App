import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";

// Define the Firebase configuration interface (optional but recommended)
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // measurementId is optional
}

// Your Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyC3aatp39wm8DJ3bOJkD8e-5zUhLClOQ_A",
  authDomain: "auth-a780e.firebaseapp.com",
  projectId: "auth-a780e",
  storageBucket: "auth-a780e.firebasestorage.app",
  messagingSenderId: "748631903870",
  appId: "1:748631903870:web:4a666fd761010165f7d22f",
  measurementId: "G-K243WSHDBQ",
};

// Initialize Firebase and Analytics
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics | null = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
