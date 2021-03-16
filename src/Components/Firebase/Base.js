import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAjCA1J6k_geKzB4f_Eldfvl8XHse1OGC8",
  authDomain: "late-auth-process.firebaseapp.com",
  projectId: "late-auth-process",
  storageBucket: "late-auth-process.appspot.com",
  messagingSenderId: "255824349770",
  appId: "1:255824349770:web:7bae807ddd84db86d1f4b3"
})