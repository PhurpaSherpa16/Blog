'uce client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import { IoMdCloseCircle } from "react-icons/io"
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from '@/lib/firebaseAuth'
import { MdUpload } from "react-icons/md";
import { FaUser } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { PiOfficeChairFill } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";

import gsap from "gsap";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'



export default function UserRegisterForm({setLoginRegister}) {
    const {setUser} = useAuth()
    const router = useRouter()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [passwordStrengthColor, setPasswordStrengthColor] = useState('')
    const [passwordStrengthStatus, setPasswordStrengthStatus] = useState('')
    const passwordStrengthRef = useRef()

    const helper = useRef()

    useEffect(() => {
        gsap.to(passwordStrengthRef.current, { width: `${passwordStrength}%`, backgroundColor: passwordStrengthColor});
    }, [passwordStrength]);

    const handleEnter = () => {
        gsap.fromTo(
            helper.current,
            { yPercent: 100, opacity: 0, zIndex: 20 },   // FROM
            { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" }  // TO
        );
    };

  const handleLeave = () => {
    gsap.to(helper.current, {
      yPercent: 10,
      duration: 0.3,
      ease: "power3.in",
      opacity: 0,
      zIndex: 0
    });
  }; 

    const [formData, setFormData] = useState({
        fullName: '',
        profession: '',
        imageUrl: 'user',
        email: '',
        password: ''
    })

    const handleLoginWithGoogle = async () =>{
        const loggedUser = await loginWithGoogle()
        if (loggedUser) {setUser(loggedUser)}

        }

    const registerSetUserHandleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }

    const isValidEmail = (email) => {
        setError("Enter a valid email address")
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handlePassword =(e)=>{
        setLoading(true)
        const chars = e.target.value.split('')
        let number = (chars.length >= 2 ? 20 : 0) +
            (chars.length >= 4 ? 20 : 0) +
            (chars.length >= 6 ? 30 : 0) +
            (/[0-9]/.test(chars) ? 5 : 0) +
            (/[A-Z]/.test(chars) ? 5 : 0) +
            (/[\W_]/.test(chars) ? 20 : 0);

        if (number >=20) {
            setPasswordStrengthColor('#ff1100')
            setPasswordStrengthStatus('Very weak')
        }
        if (number >=40) {
            setPasswordStrengthColor('#ff4d00')
            setPasswordStrengthStatus('Weak')
        }
        if (number >= 70) {
            setPasswordStrengthColor('orange')
            setPasswordStrengthStatus('Strong')
        }
        if (number >= 80) {
            setPasswordStrengthColor('#0a1e63')
            setPasswordStrengthStatus('Very Strong')
        }
        if (number >= 90) {
            setPasswordStrengthColor('#0a1e63')
            setPasswordStrengthStatus('Nice')
        }
        if (number === 100) {
            setPasswordStrengthColor('#006311')
            setPasswordStrengthStatus('OK! Stop. Enough!')
        }

        setPasswordStrength(number)
        setLoading(false)
    }


    const isValidPassword = (password) =>{
        if (password.length <= 6){
            setError("Password must be 6 letter")
            return
        }
        setError("");
        return true;
    }

    const registerUser= async(e)=>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        if(formData.email==='' 
            || formData.fullName===''
            || formData.profession==='' 
            || formData.password ===''){
            setError('Please confirm all filed are filled.')
            setLoading(false)
            return
        }

        if (!isValidEmail(formData.email)) {
            setLoading(false)
            return
        }

        if(!isValidPassword(formData.password)){
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
                image: 'user',
                password: formData.password,
                createdAt: new Date()
            })
            setUser(user)
            console.log('success register')
            alert('User Register Success')
            router.push('/admin')
        }
        catch(error){
            console.log("Register is not success.", error)
            setError('Register is not success.')
        }
        finally{
            setLoading(false)
        }
    }

    const handlePasswordShow = () =>{
        setPasswordShow((p)=>!p)
    }

  return (
    <div className="w-full lg:pt-4 2xl:pt-32 flex justify-center lg:justify-end relative">
        <div className="relative overflow-hidden flex flex-col items-center gap-6 justify-center 
        bg-[var(--whiteBlack)] border borderColor px-4 md:px-16 py-8 rounded-lg shadow-lg">
            {/* Alert Message */}
            {error &&
                <div className="absolute top-5 bg-[var(--background)] border borderColor p-2 rounded-lg">
                <div className="flex-center gap-2">
                    <p className="text-red-400">{error}</p>
                    <IoMdCloseCircle onClick={()=>setError('')} className="cursor-pointer"/>
                </div>
                </div>
            }

            <div className="flex-col flex-center text-center">
                <h1 className="text-2xl md:text-4xl tracking-wider">Join the platform</h1>
                <span className="text-[var(--textColor)] text-center">Your ideas deserve a place to grow. Let’s start.</span>
            </div>
            <form className="flex flex-col gap-4 w-80 relative">

                <div className="full flex-center relative h-fit overflow-hidden">
                    <input required type="text" name='fullName' placeholder="Your Full Name"
                    className="relative p-2 rounded border borderColor tracking-wider pl-10 w-full"
                    onChange={registerSetUserHandleChange}/>
                    <div className="h-fit w-fit absolute left-2">
                        <FaUser className="h-6 w-6"/>
                    </div>
                </div>

                <div className="full flex-center relative h-fit overflow-hidden">
                    <input required type="email" name='email' placeholder="you@example.com"
                    className="relative p-2 rounded border borderColor tracking-wider pl-10 w-full"
                    onChange={registerSetUserHandleChange}/>
                    <div className="h-fit w-fit absolute left-2">
                        <MdEmail className="h-6 w-6"/>
                    </div>
                </div>

                <div className="full flex-center relative h-fit overflow-hidden">
                    <input required type="text" name='profession' placeholder="Sr. Frontend Developer"
                    className="relative p-2 rounded border borderColor tracking-wider pl-10 w-full"
                    onChange={registerSetUserHandleChange}/>
                    <div className="h-fit w-fit absolute left-2">
                        <PiOfficeChairFill className="h-6 w-6"/>
                    </div>
                </div>

                <div className="full flex-center relative h-fit overflow-hidden">
                    <input required type={passwordShow ? 'text' : 'password'} name='password' placeholder="••••••••"
                    className="relative p-2 rounded border borderColor tracking-wider pl-10 w-full"
                    onChange={(e)=>{
                        registerSetUserHandleChange(e)
                        handlePassword(e)
                    }}/>
                    <div className="h-fit w-fit absolute left-2">
                        <FaLock className="h-6 w-6"/>
                    </div>
                    <div className="h-fit w-fit absolute right-2 text-[var(--textColor)] hover:text-[var(--flat)]
                    cursor-pointer">
                        {passwordShow ? 
                        <FaEye className="h-6 w-6" onClick={handlePasswordShow}/>
                        :
                        <FaEyeSlash className="h-6 w-6" onClick={handlePasswordShow}/>
                        }
                    </div>
                </div>

                <div className='relative grid gap-1'>
                    <div className='flex justify-between items-center'>
                        <span className='relative text-[var(--textColor)] text-xs flex items-center gap-2'>
                            Password strength
                            <FaQuestionCircle className='cursor-pointer'
                            onMouseEnter={handleEnter}
                            onMouseLeave={handleLeave}/></span>
                        <span className='relative text-[var(--textColor)] text-xs'
                        style={{color: passwordStrengthColor}}>
                            {passwordStrengthStatus}
                        </span>
                    </div>
                    {/* {mounted && ( */}
                    <div ref={helper} className='h-fit w-fit
                    absolute top-10 right-0 opacity-0 z-0
                    flex flex-col text-xs p-2 text-[var(--textColor)]
                    bg-[var(--background)] rounded border borderColor'>
                        <span className='text-[var(--flat)]'>For Strong Password should contain:</span>
                        <span>- At least 6 characters</span>
                        <span>- One uppercase letter [A-Z]</span>
                        <span>- One number [0-9]</span>
                        <span>- One special character [@#$%!&.,/ etc]</span>
                    </div>
                    {/* )} */}
                    <div className='h-1 w-full bg-gray-300 relative'>
                        <div ref={passwordStrengthRef} className='h-1 rounded-2xl w-fit'/>
                    </div>
                </div>


                <button type='button' className="reltive z-10 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white cursor-pointer
                flex-center gap-1 hover:shadow transition-all duration-200"
                onClick={registerUser}>
                    Create Account
                    <MdUpload className="h-6 w-6"/>
                </button>
            </form>
                <button onClick={handleLoginWithGoogle} className="flex-center gap-1 cursor-pointer">
                    or, Register with <FcGoogle className="h-6 w-6"/>
                </button>
            <div className='relative flex-center flex-col'>
                <span className='text-center'>Already have an account? <button type="button"
                className="text-[var(--blue)] cursor-pointer hover:text-[var(--flat)]"
                onClick={()=>setLoginRegister(true)}>Log in</button></span>

                <span className='text-center text-[var(--textColor)]'>By signing up, you agree to our 
                    <span className='text-[var(--flat)] font-medium'> Terms & Privacy Policy.</span></span>
            </div>
        </div>
    </div>
  )
}
