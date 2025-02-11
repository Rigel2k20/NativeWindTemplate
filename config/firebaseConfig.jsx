import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyB_tBAueSs15rgDD-KXkNj1guilU0WQMHg",
    authDomain: "guru-coaching-app.firebaseapp.com",
    projectId: "guru-coaching-app",
    storageBucket: "guru-coaching-app.firebasestorage.app",
    messagingSenderId: "926355843245",
    appId: "1:926355843245:web:9c6d1c24902f8cb7173e24",
    measurementId: "G-4SXMW0PHFR"
    
};

const app = initializeApp(firebaseConfig);

// Initialize auth with persistence for React Native, regular auth for web
export const auth = Platform.OS === 'web' 
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });

export const db = getFirestore(app);
