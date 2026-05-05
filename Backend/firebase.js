import dotenv from "dotenv";
// Load environment variables from .env.local in root
dotenv.config({ path: "../.env.local" });

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config using environment variables 
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);