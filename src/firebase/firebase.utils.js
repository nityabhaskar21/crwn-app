import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBfWKxPafYUl4e0Qfua0hBnafnDgIsXVyw",
  authDomain: "crwn-db-b9cb3.firebaseapp.com",
  databaseURL: "https://crwn-db-b9cb3.firebaseio.com",
  projectId: "crwn-db-b9cb3",
  storageBucket: "crwn-db-b9cb3.appspot.com",
  messagingSenderId: "772198643592",
  appId: "1:772198643592:web:5e087e2d745576bf22ec3d",
  measurementId: "G-GK4PJR7RWP"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
