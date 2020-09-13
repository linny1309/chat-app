import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBWBu1WcOiApbLZNVBSkhMGjgiXmtIMrpU",
    authDomain: "litedashchat.firebaseapp.com",
    databaseURL: "https://litedashchat.firebaseio.com",
    projectId: "litedashchat",
    storageBucket: "litedashchat.appspot.com",
    messagingSenderId: "137967623976",
    appId: "1:137967623976:web:ea2fd02660762cb0e3fa1d",
    measurementId: "G-N651HK45PG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db; 
