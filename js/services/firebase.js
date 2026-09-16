// Firebase infrastructure only. This file intentionally does not move sync, merge,
// listeners, auth, presence, chat, or business logic. It only owns the base config
// and the database handle used by the app.

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDJlc6wV_4uROXfU0pJ_RBBV-499LwTnsA",
  authDomain: "w-machado-contable.firebaseapp.com",
  databaseURL: "https://w-machado-contable-default-rtdb.firebaseio.com",
  projectId: "w-machado-contable",
  storageBucket: "w-machado-contable.firebasestorage.app",
  messagingSenderId: "479317191824",
  appId: "1:479317191824:web:eea071a3db62e8268b3c15",
  measurementId: "G-LPVSLGP3SW"
};

let firebaseDB = null;
