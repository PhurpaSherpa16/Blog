'use client'
import { useUserData } from '@/lib/UserFetch'
import React, { useEffect, useState } from 'react'
import { IoMdMailUnread } from "react-icons/io";


export default function Onthispage({htmlContent, userId}) {
    const [headings, setHeadings] = useState([])
    const userData = useUserData(userId)
    
    console.log('userData',userData)

    const profileImage = userData?.image ? `/${userData?.image}.png` : '/user.png'

    
    useEffect(() => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = htmlContent
        const h2Elements = tempDiv.querySelectorAll('h2')
        const h2Texts = Array.from(h2Elements).map(h2 => ({
            text: h2.textContent || '',
            id: h2.id || ''
        }))
        setHeadings(h2Texts)
    },[htmlContent])
    
    
    if(!userData) return


  return (
    <div className='flex flex-col gap-8'>
        <div className='on-this-page flex flex-col h-fit gap-4'>
            <span className='text-2xl font-bold'>Table of Content</span>
            <div>
                <ol type='1' className='list-decimal pl-5 flex flex-col gap-2 text-lg font-medium'>
                    {headings.map((heading, index) => (
                        <li className='hover:underline cursor-pointer' key={index}>
                            <a href={`#${heading.id}`}>{heading.text}</a>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        <div className='lg:flex items-center gap-4 bg-[var(--secondaryBackground)]
        border borderColor py-2 px-6 w-fit rounded-lg'>
            <div>
                <img src={profileImage} alt="Profile Image"
                style={{ backgroundColor: userData.color }} 
                className='h-20 w-20 relative object-cover rounded-full border borderColor'/>
            </div>
            <div className='flex flex-col py-2'>
                <span className='font-bold uppercase'>{userData.fullName}</span>
                <div>
                    <span className='border-l-4 pl-2 text-[var(--textColor)]'>
                        {userData.profession.split(" ").length <= 2 ? userData.profession : userData.profession.split(" ").slice(0,2).join(" ") + " ..."}
                    </span>
                    <span className='text-[var(--textColor)] flex items-center gap-1'>
                        <IoMdMailUnread className='h-6 w-6'/>
                        {userData.email}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
