'use client'
import { useAuth } from '@/app/components/auth/AuthContext'
import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { IoIosCloseCircle } from "react-icons/io";
import AlertModal from '@/app/components/AlertModal';
import { AlertContext } from '@/app/components/admin/AlertContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Loading from '@/app/components/admin/Loading';
import CompleteProfile from '@/app/components/admin/CompleteProfile';


export default function page() {
  const {userData, user} = useAuth()

  if (!user || !userData)
    return (
  <div className="absolute w-full flex-center md:-left-[30%] md:w-[130%] h-screen">
          <Loading/>
  </div>
  );


  const updateButton = useRef(null);
  const [avatarDiv, setAvatarDiv] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)

  const {setMessage} = useContext(AlertContext)
  const [error, setError] = useState()
  const [disable, setDisable] = useState(false)
  const [data, setData] = useState({
    fullName : userData?.fullName,
    profession : userData.profession,
    image : userData.image,
    color : userData.color
  })
  
  const profileImage = data.image ? `/${data.image}.png` : '/user.png'

  useEffect(() => {
      gsap.set(updateButton.current, { yPercent: 100 });
    }, []);
  
  const handleEnter = () => {
    gsap.to(updateButton.current, {
      yPercent: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  };

  const handleLeave = () => {
    gsap.to(updateButton.current, {
      yPercent: 100,
      duration: 0.4,
      ease: "power3.in"
    });
  }; 

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData(prev => ({...prev, [name]: value}))

    if (value.trim().length === 0){
      setError('Please, type name or profession.');
      setDisable(true)
    }
    else{
      setError('')
      setDisable(false)
    }
  }

  const images = [
    {name:'avatar_boy', src:'/avatar_boy.png', color:'#ff4d00'},
    {name:'avatar_girl', src:'/avatar_girl.png', color:'#a2ff00'},
    {name:'avatar_with_beard', src:'/avatar_with_beard.png', color:'#0d00ff'},
  ]

  const handleUpdate = () =>{
    if (data.image === userData.image && data.fullName === userData.fullName && data.profession === userData.profession){
      setError("No changes to save.")
      return
    }
    if (data.fullName.trim().length === 0 || data.profession.trim().length === 0){
      setError('Please, type name or profession.')
    }
    else{
      setConfirmModal(true)
      setError('')
    }
  }

  const saveChanges = async () =>{
    try{
      setConfirmModal(false)
      const result = doc(db, 'users', user.uid)
      await updateDoc(result, data)
      setMessage('Pofile Updated')
      }
      catch(error){
          setMessage('Profile not updated')
        }
  }

  return (
    <div className='relative w-full'>
      {confirmModal && 
      <div className='w-full fixed flex h-screen flex-center items-center z-20'>
        <AlertModal setConfirmModal={setConfirmModal} saveChanges={saveChanges}/>
      </div>
      }

      <div className='py-8 md:py-16 px-4 relative w-full'>
        <div>
          <span className='text-[var(--textColor)]'>Make changes to your personal information</span>
          <h1>Update Profile Information</h1>
        </div>
        <div className='w-full flex-center py-8 md:py-16'>
            <div className='w-full md:w-2/4 bg-[var(--secondaryBackground)] p-8 md:p-16 border-1 border-[var(--border)]
            rounded-lg grid gap-4'>
                  <div className='w-full flex flex-col items-center justify-center relative'>
                      <div onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                      className={`relative overflow-hidden 
                        ${profileImage === '/user.png' ? 'bg-[#ffffff]' : 'bg-[#ff4d00] ' } 
                      w-fit rounded-full`}>
                        <img src={profileImage} alt="Profile Image"
                        style={{ backgroundColor: data.color }}
                        className='h-40 w-40 relative object-cover'/>
                        <button ref={updateButton} className='text-white
                        bg-black/20 backdrop-blur-2xl absolute bottom-0 left-0 p-4 w-full cursor-pointer'
                        onClick={()=>setAvatarDiv((p)=>!p)}
                        >Update</button>
                      </div>
                      {avatarDiv ? 
                      <div className='absolute -bottom-26 bg-[var(--whiteBlack)] p-6 border-1 border-[var(--border)] 
                      rounded-lg'>
                        <span className='text-[var(--textColor)]'>Choose Avatar</span>
                        <div className='absolute right-2 top-2 cursor-pointer'
                        onClick={()=>setAvatarDiv(false)}>
                          <IoIosCloseCircle/>
                        </div>
                        <div className='flex gap-4 pt-4'>
                          {images.map((item, index)=>(
                          <div key={index} style={{ backgroundColor: item.color }} className={` 
                          shadow-md hover:shadow-xl hover:scale-110 cursor-pointer transition-all duration-300
                          rounded-full overflow-hidden relative`}>
                            <img src={item.src} alt={item.name}
                            className='h-12 w-12 relative'
                            onClick={()=>setData(prev =>({...prev, image: item.name, color: item.color}))}/>
                          </div>
                        ))}
                        </div>
                      </div>
                      : ''}
                  </div>
                  <input type="text" name='fullName' placeholder='Enter Full Name' value={data.fullName}
                  className='input'
                  onChange={handleChange}/>
                  <input type="text" name='profession' placeholder='Type profession' value={data.profession}
                  className='input'
                  onChange={handleChange}/>
                  <div className='w-full grid md:flex gap-4'>
                    <button type='button' disabled={disable} className='disabled:cursor-not-allowed button disabled:bg-gray-300 bg-green-400
                    hover:text-white 
                    hover:bg-green-500 w-full'
                    onClick={handleUpdate}
                    >Update</button>
                    <button className='button bg-gray-400 hover:bg-gray-500
                    hover:text-white  w-full'>Cancel</button>
                  </div>
                  <div className='flex gap-2'>
                    <Link href={'/'} className='text-[var(--textColor)] hover:text-[var(--flat)] w-fit'>Change Password?</Link>
                  </div>
                  <div>
                    {error && <span className='text-red-500'>{error}</span>}
                  </div>
            </div>
        </div>
      </div>
    </div>
  )
}
