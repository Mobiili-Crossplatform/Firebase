
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCLufJeGbVMTUQu73wrZ8bppc6VNJTTXu4",
  authDomain: "vk-8-42841.firebaseapp.com",
  projectId: "vk-8-42841",
  storageBucket: "vk-8-42841.appspot.com",
  messagingSenderId: "401727496103",
  appId: "1:401727496103:web:9a58d390e07501d311a082",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES = 'messages';

export { 
  firestore, collection, addDoc, serverTimestamp, MESSAGES
};
