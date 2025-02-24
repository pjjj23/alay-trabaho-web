// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAfCuib-Q7FmAlr9oj9CIwBONeMkWnpdgU",
    authDomain: "ctuacaccreditedboardinghouse.firebaseapp.com",
    projectId: "ctuacaccreditedboardinghouse",
    storageBucket: "ctuacaccreditedboardinghouse.appspot.com",
    messagingSenderId: "930916912489",
    appId: "1:930916912489:web:58f4a20a4ca620471c81f8",
    databaseURL: "https://ctuacaccreditedboardinghouse-default-rtdb.firebaseio.com",
    measurementId: "G-2KK40DYS31"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
