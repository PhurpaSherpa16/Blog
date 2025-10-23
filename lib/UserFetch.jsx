import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const useUserData = (userId) =>{
  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    if (!userId) return null

    const userDocRef = doc(db, 'users', userId)
    const unsubscribe = onSnapshot(userDocRef, (docSnap)=>{
      if(docSnap.exists()){
        setUserData(docSnap.data())
      }
      else{
        setUserData(null)
      }
    })
    return ()=> unsubscribe()
  }, [userId])

  return userData
}