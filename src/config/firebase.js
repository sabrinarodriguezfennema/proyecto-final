// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy0y-ypS8epQ9w8kIgS6CiRdIs0YAx19A",
  authDomain: "proyecto-final-391d5.firebaseapp.com",
  projectId: "proyecto-final-391d5",
  storageBucket: "proyecto-final-391d5.firebasestorage.app",
  messagingSenderId: "126847635890",
  appId: "1:126847635890:web:ddd06ed7c52c06c58614ab",
  measurementId: "G-RYB31LS4TR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

async function testConnection() {
  try {
    const snapshot = await getDocs(collection(db, "productos"));
    console.log("Conexión OK. Productos:", snapshot.docs.map(doc => doc.data()));
  } catch (err) {
    console.error("Error al conectar con Firestore:", err);
  }
}

testConnection();