'use client'
import { useAuth } from '@/app/components/auth/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function page() {
  const {userData} = useAuth()
  if(!userData) return

  const [data, setData] = useState({
    fullName : userData?.fullName,
    email : userData?.email,
    profession : userData.profession
  })

  return (
    <div>
      <div className='py-16 px-8'>
        <div>
          <span className='text-[var(--textColor)]'>Make changes to your personal information</span>
          <h1>Update Profile Information</h1>
        </div>
        <div className='w-full flex-center py-16'>
            <div className='w-2/4 bg-[var(--secondaryBackground)] p-16 border-1 border-[var(--border)]
            rounded-lg grid gap-4'>
                  <div className='w-full flex items-center justify-center'>
                      <div className='overflow-hidden bg-[#ff4d00] w-fit rounded-full'>
                        <Image
                          className='object-cover'
                          src={'/avatar_boy.png'}
                          height={150}
                          alt='logo'
                          width={150}
                          />
                      </div>
                  </div>
                  <input type="text" placeholder='Enter Full Name' value={data.fullName}
                  className='input'/>
                  <input type="text" placeholder='Enter email' value={data.email}
                  className='input'/>
                  <input type="text" placeholder='Enter email' value={data.profession}
                  className='input'/>
                  <div className='w-full flex gap-4'>
                    <button className='button bg-green-500 w-full'>Update</button>
                    <button className='button bg-gray-500 w-full'>Cancel</button>
                  </div>
                  <Link href={'/'} className='text-[var(--textColor)] hover:text-[var(--flat)] w-fit'>Change Password?</Link>
            </div>
        </div>
      </div>
    </div>
  )
}
