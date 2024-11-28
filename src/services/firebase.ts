import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyDVc1K6NuGos8q6sdUoWkFyvdFoPBBjahU",
authDomain: "adspace-cd17d.firebaseapp.com",
projectId: "adspace-cd17d",
storageBucket: "adspace-cd17d.firebasestorage.app",
messagingSenderId: "719826259903",
appId: "1:719826259903:web:00fdb2267eb7995fbd9b0a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);