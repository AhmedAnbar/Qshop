import firebase from '@firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firestore'
import 'firebase/storage'

require("firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyCHRg3fIVQXfLu5v7yk51o3WvOZotjTKbE",
    authDomain: "vue-shop-6e94a.firebaseapp.com",
    databaseURL: "https://vue-shop-6e94a.firebaseio.com",
    projectId: "vue-shop-6e94a",
    storageBucket: "vue-shop-6e94a.appspot.com",
    messagingSenderId: "275552862921",
    appId: "1:275552862921:web:ce22568abf7ebc2f"
  }
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export { fb, db }

  