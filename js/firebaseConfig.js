// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Uoiy_CY3mJkjoYq3wGq3IBo2pnGnWOk",
  authDomain: "okok-60356.firebaseapp.com",
  databaseURL: "https://okok-60356-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "okok-60356",
  storageBucket: "okok-60356.appspot.com",
  messagingSenderId: "396003843942",
  appId: "1:396003843942:web:5739d844930d1acc5332a7",
  measurementId: "G-NEZD31FNSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {db};
