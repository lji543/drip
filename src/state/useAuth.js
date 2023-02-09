import { useContext } from 'react';
import { 
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'

import { auth, db } from '../utils/firebase.config';
import { BudgetContext } from "./BudgetContext";

const useAuth = () => {
  const { authenticatedUserBudgetContext } = useContext(BudgetContext);
  const owedItemsCollectionRef = collection(db, 'owedItems');
  const [authenticatedUser, setAuthenticatedUser] = authenticatedUserBudgetContext;

  const getAuthenticatedUser = () => {
    if (!authenticatedUser) {
      console.log('getAuthenticatedUser auth ',authenticatedUser)
    }
    // setAuthenticatedUser();
  }

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          // console.log('logInWithEmailAndPassword .then ',auth, email, password)
          // console.log('logInWithEmailAndPassword .then ',data)
          setAuthenticatedUser(data.user);
        });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // const res = await signInWithPopup(auth, googleProvider);
      // const user = res.user;
      // const q = query(collection(db, "users"), where("uid", "==", user.uid));
      // const docs = await getDocs(q);
      // if (docs.docs.length === 0) {
      //   await addDoc(collection(db, "users"), {
      //     uid: user.uid,
      //     name: user.displayName,
      //     authProvider: "google",
      //     email: user.email,
      //   });
      // }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return {
    authenticatedUser: authenticatedUser,
    getAuthenticatedUser,
    logInWithEmailAndPassword,
    logout,
    sendPasswordReset,
  }
};

export default useAuth;