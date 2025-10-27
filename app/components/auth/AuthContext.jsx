"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null)
  const router = useRouter()

 useEffect(() => {
  let unsubscribeSnapshot = () => {}; // default no-op

  const unsub = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser){
      setUser(currentUser);  // no need to spread {...currentUser}
      const userDocRef = doc(db, 'users', currentUser.uid);

      unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap)=>{
        if (docSnap.exists()){
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
      });
    } else {
      setUserData(null);
      setUser(null);
    }
    setLoading(false);
  });

  return () => {
    unsub();               // cleanup auth listener
    unsubscribeSnapshot();  // cleanup firestore listener
  }
}, []);


  const logout = async () => {
    await signOut(auth);
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, setUserData, userData, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
