'use client'
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { MdUpload } from "react-icons/md";
import { FaUser } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { PiOfficeChairFill } from "react-icons/pi";
import { useAuth } from "../auth/AuthContext";
import ErrorAlert from "../ErrorAlert";
import ProfileImageChange from "../ProfileImageChange";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LoadingElephant from '@/public/LoadingElephant.json'
import Lottie from 'lottie-react';
import successAnimation from '@/public/success.json'

export default function CompleteProfile() {
  const {user, setUserData, logout} = useAuth()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  console.log(user.uid)

  console.log(user.displayName)

  const [formData, setFormData] = useState({
          fullName: user.displayName,
          profession: '',
          image: '',
          email: user.email,
          color : '',
    })

   const registerSetUserHandleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }
    const registerUser= async(e)=>{
        e.preventDefault()
        console.log(formData)
        setSuccess(false)
        setLoading(true)
        setError('')
        if(formData.email==='' 
            || formData.fullName===''
            || formData.profession===''){
            setError('Please confirm all filed are filled.')
            setLoading(false)
            return
        }
        try{
            setLoading(true)
            setTimeout(() =>{
              setSuccess(true)
              setTimeout(()=>{
                setSuccess(false)
                setTimeout( async ()=>{
                  await setDoc(doc(db, 'users',user.uid),{
                      fullName: formData.fullName,
                      email: formData.email,
                      profession: formData.profession,
                      image: formData.image,
                      color : formData.color,
                      createdAt: new Date(),
                  })
                  setUserData(formData)
                  router.push('/admin')
                  setLoading(false)
                },10)
              },1000)
            },2000)
        }
        catch(error){
            console.log("Register is not success.", error)
            setError('Register is not success.')
            setLoading(false)
        }
    }
  
  return (
    <div className='container mx-auto py-16 relative px-4'>
          <div className="relative grid gap-8 lg:gap-16 w-full">
            <div className='lg:flex grid items-end gap-4 lg:gap-8 relative'>
              <div>
                <button className='flex-center gap-1 bg-[var(--secondaryBackground)] px-4 py-1 rounded
                hover:bg-[var(--flat)] hover:text-[var(--whiteBlack)] cursor-pointer transition-Smooth'
                onClick={logout}>
                  <MdKeyboardBackspace className='h-8 w-8'/>
                  Go Back
                </button>
              </div>
              <div>
                <span className='text-center text-[var(--textColor)]'>We just need a few details to set up your account before you continue.</span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl">Complete Your Profile</h1>
              </div>
            </div>

            {/* Alert Message */}

            {/* Form */}
            <div className="lg:w-8/10 flex-center lg:justify-center md:items-start md:justify-start pb-16">
              <div className="flex flex-col gap-4 w-80 relative p-8 bg-[var(--secondaryBackground)]
            border borderColor rounded">
                    <ErrorAlert error={error} setError={setError}/>
                    <ProfileImageChange formData={formData} setFormData={setFormData}/>
                    <div className="full flex-center relative h-fit overflow-hidden">
                        <input required type="text" name='fullName' value={formData.fullName} placeholder="Your Full Name"
                        className="relative p-2 rounded border borderColor tracking-wider pl-10 w-full"
                        onChange={registerSetUserHandleChange}/>
                        <div className="h-fit w-fit absolute left-2">
                            <FaUser className="h-6 w-6"/>
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
                  <div className="w-full flex flex-col relative">
                    {loading ? 
                    <div className="flex-center w-full flex-col">
                        {success ? 
                        <Lottie className='h-16 w-16' animationData={successAnimation} loop={false} />
                        :
                        <Lottie className='h-20 w-20' animationData={LoadingElephant} loop={true} />
                        }
                    </div>
                      :
                    <button type='button' className="reltive z-10 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white cursor-pointer
                      flex-center gap-1 hover:shadow transition-all duration-200"
                      onClick={registerUser}>
                        Save
                        <MdUpload className="h-6 w-6"/>
                    </button>
                  }
                  </div>
                </div>
            </div>
          </div>
    </div>
  )
}
