import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { auth } from "@/lib/firebase";

//

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPZY36ctPqlvIgUQEQyPabQ6UAR3eszIA",
  authDomain: "nassau-c3754.firebaseapp.com",
  projectId: "nassau-c3754",
  storageBucket: "nassau-c3754.appspot.com",
  messagingSenderId: "72903832410",
  appId: "1:72903832410:web:50d79b3da807338b787963",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  //

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    window.location.reload();
  };

  const logOut = () => {
    signOut(auth);
    window.location.reload();
  };

  useEffect(() => {
    if (window !== "undefiend") {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
      });

      // Return a function that will be called when the component unmounts
      return () => {
        unsubscribe(); // Stop listening for auth state changes
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
