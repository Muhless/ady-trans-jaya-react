import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyC5Kwlchu_F7zqan8BbRXqhFoNNTbuqWCo",
  authDomain: "ady-trans-jaya.firebaseapp.com",
  projectId: "ady-trans-jaya",
  storageBucket: "ady-trans-jaya.firebasestorage.app",
  messagingSenderId: "275957254935",
  appId: "1:275957254935:web:0004c39f7d00c305a90552",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, setDoc, doc };