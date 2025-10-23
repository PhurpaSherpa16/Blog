import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "./firebase"

export const loginWithGoogle = async () =>{
    try{
        const result = await signInWithPopup(auth, googleProvider)
        // this gives google access token
        const credential = googleProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user // user Info
        return {user, token}

    }
    catch(error){
        console.error("Google login failed:", error);
        return null
    }
}

export const registerWithEmail = async (email, password) =>{
    try{
        const result = await createUserWithEmailAndPassword(auth, email, password)
        return result.user 
    }
    catch(error){
        console.log('Register error:',error)
        throw error
    }
}