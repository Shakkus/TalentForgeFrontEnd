
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

export const authcontext = createContext();

export const useAuth = () => {
  const context = useContext(authcontext);
  if (!context) throw new Error("There is no auth Provider");
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)
  const singUp = async (email, password) => {

    await createUserWithEmailAndPassword(auth, email, password)
  };

  const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password,)
  }

  const logOut = async () => {
    await signOut(auth)
  }

  const logginWhitGoogle = async () => {
    const googleProvider = await new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }

  const logginWhitTwitter = async () => {
    const twitterProvider = await new TwitterAuthProvider()
    return signInWithPopup(auth, twitterProvider)
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      localStorage.setItem('loggedUser', user.accessToken)
    })
  }, [])

  return (
    <authcontext.Provider value={{ singUp, logIn, user, logOut, loading, logginWhitGoogle, logginWhitTwitter }}>
      {children}
    </authcontext.Provider>
  );
};

