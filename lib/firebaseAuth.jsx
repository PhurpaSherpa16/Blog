import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () =>{
    try{
        const result = await signInWithPopup(auth, provider)
        // this gives google access token
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user // user Info
        return {user, token}

    }
    catch(error){
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Google login error", error);
        throw error;
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