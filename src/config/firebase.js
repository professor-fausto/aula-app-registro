import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // novidade
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const app = initializeApp(firebaseConfig); // app vem daqui

export const db = getFirestore();

export const auth = getAuth(app) // novidade

export default db;
