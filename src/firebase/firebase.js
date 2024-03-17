import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB2DdkEV4Dthg3otxQ1BUOTeJseiiY4xvQ",
  authDomain: "instagram-clone-e65c6.firebaseapp.com",
  projectId: "instagram-clone-e65c6",
  storageBucket: "instagram-clone-e65c6.appspot.com",
  messagingSenderId: "283109290804",
  appId: "1:283109290804:web:ff142f07fa74b81c73eb61",
  measurementId: "G-MYH20GTCB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export{app,auth,firestore,storage};

