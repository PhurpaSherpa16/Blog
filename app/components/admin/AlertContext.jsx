'use client'
import React, { createContext, useState } from 'react'

export const AlertContext = createContext();


export default function AlertProvider({children}) {
    const [message, setMessage] = useState(null)
    const [type, setType] = useState('success')

    const showAlert = (msg, varient = "success") =>{
        setMessage(msg)
        setType(varient)
    }

    const clearAlert = () => setMessage(null)

  return (
    <AlertContext.Provider value={{message, setMessage, type, showAlert, clearAlert}}>
      {children}
    </AlertContext.Provider>
  )
}

