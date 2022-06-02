import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // novidade
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC92Lxy4WtkqtvBZPTYh27SJpdJvw05nwE",
    authDomain: "appregistro-d46a5.firebaseapp.com",
    projectId: "appregistro-d46a5",
    storageBucket: "appregistro-d46a5.appspot.com",
    messagingSenderId: "767566334665",
    appId: "1:767566334665:web:98c18d97ed03af3da9db18"
};

export const app = initializeApp(firebaseConfig); // app vem daqui

export const db = getFirestore();

export const auth = getAuth(app) // novidade

export default db;