import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD6o2ED_-d5h-P3jwJF9GD_Ey4vqlgmuoA",
  authDomain: "moviemania-1b8b1.firebaseapp.com",
  projectId: "moviemania-1b8b1",
  storageBucket: "moviemania-1b8b1.appspot.com",
  messagingSenderId: "856170864716",
  appId: "1:856170864716:web:6178c3d7752047238bd4e9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const logout = () => {
    signOut(auth);
};

export { auth, db, login, signup, logout };
