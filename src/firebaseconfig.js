

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCIQd-xrYMI9gd8zO0lkFihC_RwdZPGf1o",
    authDomain: "pollingbooth-21145.firebaseapp.com",
    projectId: "pollingbooth-21145",
    storageBucket: "pollingbooth-21145.appspot.com",
    messagingSenderId: "335293838585",
    appId: "1:335293838585:web:08bdd5198f7f1744d29e28",
    measurementId: "G-F83LNQB7ND"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
