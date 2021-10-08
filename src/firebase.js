import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC5BxAmGGDdW5uNyDfKHf55fxIjYHhevjw",
    authDomain: "foodpanda-marufshobo.firebaseapp.com",
    databaseURL: "https://foodpanda-marufshobo-default-rtdb.firebaseio.com",
    projectId: "foodpanda-marufshobo",
    storageBucket: "foodpanda-marufshobo.appspot.com",
    messagingSenderId: "18118800622",
    appId: "1:18118800622:web:7896e0b9b9ca87597e6fff",
    measurementId: "G-4Z4HFJE12D"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
