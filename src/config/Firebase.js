import FirebaseContext from './context';

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// import { FIREBASE_CONFIG } from "./constants";

// const {
//     apiKey,
//     authDomain,
//     databaseURL,
//     messagingSenderId,
//     projectId,
//     storageBucket
// } = FIREBASE_CONFIG;

const config = {
    apiKey: "AIzaSyCQAXoLiWogLUag9edVH9Lzih0hPKgQod4",
    authDomain: "econolabsdata.firebaseapp.com",
    databaseURL: "https://econolabsdata.firebaseio.com",
    projectId: "econolabsdata",
    storageBucket: "",
    messagingSenderId: "861588864561",
    appId: "1:861588864561:web:5b815e6837a042fe"
    // apiKey,
    // authDomain,
    // databaseURL,
    // projectId,
    // storageBucket,
    // messagingSenderId
};


class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`databyuser/${uid}`);

    databycode = code => this.db.ref(`databycode/${code}`);

    users = () => this.db.ref('users');

}

export default Firebase;

export { FirebaseContext };