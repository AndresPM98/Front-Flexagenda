// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// export const app = firebase.initializeApp({
//   apiKey: "AIzaSyAyz_xe59CvaU4peu5slywfkwMnKxvx_C0",
//   authDomain: "pf-flexagenda.firebaseapp.com",
//   projectId: "pf-flexagenda",
//   storageBucket: "pf-flexagenda.appspot.com",
//   messagingSenderId: "688325303889",
//   appId: "1:688325303889:web:9acc5796a90f92ea6ce270",
//   measurementId: "G-H8CWYPNPTV",
// });

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: "select_account" });
// googleProvider.addScope("profile");
// googleProvider.addScope("email");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyz_xe59CvaU4peu5slywfkwMnKxvx_C0",
  authDomain: "pf-flexagenda.firebaseapp.com",
  projectId: "pf-flexagenda",
  storageBucket: "pf-flexagenda.appspot.com",
  messagingSenderId: "688325303889",
  appId: "1:688325303889:web:9acc5796a90f92ea6ce270",
  measurementId: "G-H8CWYPNPTV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function userExists(uid) {
  const docRef = doc(db, "professionals", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function RegisterEmailUser(auth, form) {
  const loginUser = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );
  console.log(loginUser);
  return loginUser;
}

export async function createUser(uid, form) {
  try {
    if (
      form.name &&
      form.email &&
      form.password &&
      form.phone &&
      form.address &&
      form.description &&
      form.category
    ) {
      const newUser = await setDoc(doc(db, "professionals", uid), {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
        description: form.description,
        category: form.category,
      });
    } else {
      console.log("faltan datos");
    }
  } catch (error) {
    console.log(error);
  }
}