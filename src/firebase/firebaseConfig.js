// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APIKEY,
//   authDomain: import.meta.env.VITE_AUTHDOMAIN,
//   projectId: import.meta.env.VITE_PROJECTID,
//   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APPID
// };
const firebaseConfig = {
  apiKey: "AIzaSyAJTYCSUSCMEkkmryY32fpbhb66gmu8Gy0",
  authDomain: "b9a11-client-side-protim1451.firebaseapp.com",
  projectId: "b9a11-client-side-protim1451",
  storageBucket: "b9a11-client-side-protim1451.appspot.com",
  messagingSenderId: "306566549345",
  appId: "1:306566549345:web:1e4b2144f936752a1dff20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;