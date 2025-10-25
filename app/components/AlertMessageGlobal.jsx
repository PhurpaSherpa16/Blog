'use client'
import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from './admin/AlertContext'
import Lottie from 'lottie-react';
import animation from '@/public/success.json'

export default function AlertMessageGlobal() {
    const {message, clearAlert} = useContext(AlertContext)
    const [visible, setVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
        if (!message) return

        const timeOut = setTimeout(()=>{
            setVisible(false)
            clearAlert()
        }, 3000)
        return () => clearTimeout(timeOut)
    }, [message])

    useEffect(()=>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth <768)
        }

        handleResize()
        window.addEventListener('resize',handleResize)

        return ()=>window.removeEventListener('resize',handleResize)
    },[])

    if (!message) return null


  return (
    <>
    {isMobile ? 
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 bg-[var(--secondaryBackground)]
            border-1 border-[var(--border)]
            w-fit z-200 rounded-lg`}>
            <div className='relative p-4'>
            <div>
            <span className='gap-2 flex-center'>
            <Lottie className='h-6 w-6' animationData={animation} loop={false} />
            {message}
            </span>
            </div>
            </div>
        </div>
            :
    <div className={`fixed top-4 right-4 bg-[var(--secondaryBackground)]
    border-1 border-[var(--border)]
    w-fit z-200 rounded-lg`}>
        <div className='relative p-4'>
            <div>
                <span className='gap-2 flex-center'>
                <Lottie className='h-6 w-6' animationData={animation} loop={false} />
                {message}
                </span>
            </div>
        </div>
    </div>
        }
    </>
  )
}

// 768px