import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSpk-VCARurTcpQ8iaPzv0WJZsJwyQEe8",
  authDomain: "prueba-afex-f8725.firebaseapp.com",
  projectId: "prueba-afex-f8725",
  storageBucket: "prueba-afex-f8725.appspot.com",
  messagingSenderId: "579123233702",
  appId: "1:579123233702:web:cd5b78e51ce096a228c567",
};
initializeApp(firebaseConfig);

const db = getFirestore();

const videosRef = collection(db, "videos");

export { db, videosRef };
