import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:  import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
    appId:  import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:  import.meta.env.VITE_FIREBASE_MEASURMENT_ID
});

export const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
