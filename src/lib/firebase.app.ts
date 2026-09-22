import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase";


const firebaseApp =
    getApps().length > 0
        ? getApps()[0]
        : initializeApp(firebaseConfig);

export default firebaseApp;