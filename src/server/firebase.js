
// Import the functions you need from the SDKs you need
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import { initializeApp} from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"; //Authentication
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

import appLogger from "../assets/js/AppLogger";

// Firebase Emulator Constants
const EMU_FIRESTORE_PORT = 9200;
const EMU_AUTH_PORT = 9099;
const EMU_STORAGE_PORT = 9199;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

//authentication
const auth = getAuth();

//firestore
const firestore = getFirestore(app);

//storage
const storage = getStorage(app);

/**
 * Flag in environment variables to enable the use of emulators.
 */
if(process.env.REACT_APP_USE_EMULATOR && process.env.REACT_APP_USE_EMULATOR === "Y"){
  if (window.location.hostname === "localhost") {
    appLogger.warn("FIREBASE: Using Firestore Emulator");
    connectFirestoreEmulator(firestore,"localhost",EMU_FIRESTORE_PORT);   

    appLogger.warn("FIREBASE: Using Authentication Emulator");
    connectAuthEmulator(auth, `http://localhost:${EMU_AUTH_PORT}`);

    appLogger.warn("FIREBASE: Using Storage Emulator");
    connectStorageEmulator(storage, `http://localhost:${EMU_STORAGE_PORT}`);

    //do some emulator effects here eg: upload lookup tables. 
  }
}else{
  appLogger.warn("FIREBASE: Currently using live resources.")
}

const firebase = {
  firestore: firestore,
  auth: auth,
  storage: storage
}

export default firebase;
