import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAkBY-J8RbtM9DyzmV29pnlYzpvsG_1NXk",
    authDomain: "margubpanda.firebaseapp.com",
    databaseURL: "https://margubpanda-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "margubpanda",
    storageBucket: "margubpanda.appspot.com",
    messagingSenderId: "858428598109",
    appId: "1:858428598109:web:9f66d3b0058da220f16ab4",
    measurementId: "G-3V0J1FNHQM"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
