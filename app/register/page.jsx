'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '../components/auth/AuthContext'
import { registerWithEmail } from '@/lib/firebaseAuth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'

export default function page() {
    const {setUser} = useAuth()
    const router = useRouter()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        fullName: '',
        profession: '',
        imageUrl: 'user',
        email: '',
        password: ''
    })

    const registerSetUserHandleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }

    const registerUser= async(e)=>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        if(formData.email==='' 
            || formData.fullName===''
            || formData.profession==='' 
            || formData.password ===''){
            setError('Set the required field.')
            setLoading(false)
            return
        }
        try{
            const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const user = result.user
            console.log(user)
            await setDoc(doc(db, 'users',user.uid),{
                fullName: formData.fullName,
                email: formData.email,
                profession: formData.profession,
                image: formData.imageUrl,
                password: formData.password,
                createdAt: new Date()
            })
            setUser(user)
            console.log('success register')
            alert('User Register Success')
            router.push('/admin')
        }
        catch(error){
            console.log("error in registering", error)
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }


  return (
    <div className='paddin-inLine'>
      <span>Lets Create Account</span>
            <input required type="text" name='fullName' placeholder="Full Name"
             onChange={registerSetUserHandleChange}/>
            <input required type="email" name='email' placeholder="Email"
             onChange={registerSetUserHandleChange}/>
            <input required type="text" name='profession' placeholder="Profession"
             onChange={registerSetUserHandleChange}/>
            <input required type="text" name='password' placeholder="Password"
             onChange={registerSetUserHandleChange}/>
             <button onClick={registerUser}>
                Register
             </button>
        {error && <p className="text-red-500">{error}</p>}
      <span>Already have account? 
      <Link href={'/login'}>Login</Link>
      </span>
    </div>
  )
}
