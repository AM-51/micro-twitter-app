import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAh_SZA0E_X4_MK0FbTiVaAF0hT5iGAhGc",
  authDomain: "micro-twitter-471aa.firebaseapp.com",
  databaseURL: "https://micro-twitter-471aa-default-rtdb.firebaseio.com",
  projectId: "micro-twitter-471aa",
  storageBucket: "micro-twitter-471aa.appspot.com",
  messagingSenderId: "15405872241",
  appId: "1:15405872241:web:6bd926d04e6043f4c4d7d0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export const db = getFirestore();

export function signInWithGoogle() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userGoogle = result.user;
      addUserGoogle({
        userName: userGoogle.displayName,
        email: userGoogle.email,
        image: userGoogle.photoURL,
        id: userGoogle.uid,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export async function addUserGoogle(userGoogle) {
  const docGoogleRef = doc(db, "users", userGoogle.id);
  const payloadGoogle = {
    userName: userGoogle.userName,
    email: userGoogle.email,
    image: userGoogle.image,
    id: userGoogle.id,
    isGoogle: true,
  };
  try {
    await setDoc(docGoogleRef, payloadGoogle);
  } catch (error) {
    console.log(error);
  }
}

export async function addUser(user) {
  const docRef = doc(db, "users", user.response.uid);
  const payload = {
    userName: user.modalName,
    email: user.response.email,
    image: user.response.photoURL,
    id: user.response.uid,
    isGoogle: false,
  };
  await setDoc(docRef, payload);
}

export async function addTweet(tweet) {
  const collectionRef = collection(db, "tweets");
  const payload = {
    userName: tweet[0].userName,
    content: tweet[0].content,
    date: tweet[0].date,
    id: tweet[0].userID,
  };
  await addDoc(collectionRef, payload);
}
