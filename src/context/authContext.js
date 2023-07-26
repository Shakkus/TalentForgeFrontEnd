
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";
import axios from 'axios'

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
    localStorage.setItem("loggedUser", true)
    localStorage.setItem("userAccountType", 'user')
    return signInWithPopup(auth, googleProvider)
  }

  const logginWhitTwitter = async () => {
    const twitterProvider = await new TwitterAuthProvider()
    localStorage.setItem("loggedUser", true)
    localStorage.setItem("userAccountType", 'user')
    return signInWithPopup(auth, twitterProvider)
  }

  const dbPost = async(user) => {
    if(user){
        if(user.email){
          const userInfo = {
            fullName: user?.displayName,
            username: user?.displayName,
            email: user?.email,
            country: "unknown",
            dateOfBirth: "dd/mm/yyyy",
            password: user?.accessToken,
            confirmPass: user?.accessToken,
            profileImage: user.photoURL,
            accountType: "user",
            registerWith: "google"
          }
          await axios.post("https://talent-forge-data.cyclic.app/user/", userInfo)
        } else {
          const userInfo = {
            fullName: user?.displayName,
            username: user?.displayName,
            email: "unknown",
            country: "unknown",
            dateOfBirth: "dd/mm/yyyy",
            password: user?.accessToken,
            confirmPass: user?.accessToken,
            profileImage: user.photoURL,
            accountType: "user",
            registerWith: "twitter"
          }
          await axios.post("https://talent-forge-data.cyclic.app/user/", userInfo)
        }
    } else {
      console.log('saliste del videojuego')
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      if(localStorage.getItem("loggedUser")){
        dbPost(currentUser)
      }
    })
  }, [])

  return (
    <authcontext.Provider value={{ singUp, logIn, user, logOut, loading, logginWhitGoogle, logginWhitTwitter }}>
      {children}
    </authcontext.Provider>
  );
};

