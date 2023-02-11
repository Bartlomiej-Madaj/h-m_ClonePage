import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "hm-clone-d43b0.firebaseapp.com",
    projectId: "hm-clone-d43b0",
    storageBucket: "hm-clone-d43b0.appspot.com",
    messagingSenderId: "198421880766",
    appId: process.env.NEXT_PUBLIC_API_ID
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)