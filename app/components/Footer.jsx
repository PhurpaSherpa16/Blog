'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { RiMessage3Fill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { MdSendToMobile } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import LoadingElephant from '@/public/LoadingElephant.json'
import Lottie from 'lottie-react';
import successAnimation from '@/public/success.json'
import ErrorAlert from './ErrorAlert';


export default function Footer() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const sendMessage = (e) =>{
        setError('')
        if(!message){
            setError('Please Enter Message')
            return
        }
        setLoading(true)
        setTimeout(()=>{
            setSuccess(true)
            setTimeout(()=>{
                setLoading(false)
                setSuccess(false)
                setMessage('')
            },1000)
        },2000)
    }

  return (
    <div className='padding-inLine px-4 lg:px-0 relative w-full'>
        <div className='gap-4 flex flex-col md:flex-row justify-between items-center pb-8 w-full'>
            <div className='grid w-full lg:w-fit gap-2'>
                <h2 className='font-bold'>
                    Reach out and stay connected <br className='hidden md:block'/> — I’ll keep you updated 
                    with the latest fixes and tutorials.
                </h2>
                <div className='relative flex flex-col md:flex-row items-center md:w-fit gap-4'>
                    <div className='absolute -top-20 w-full'>
                        <ErrorAlert error={error} setError={setError}/>
                    </div>
                    <RiMessage3Fill className='text-[var(--textColor)] h-6 w-6 absolute left-2 top-2'/>
                    <input type="text" name='message' value={message} autoComplete='off' placeholder='Message Me*' className='border borderColor rounded
                    shadow p-2 w-full md:w-70 pl-12' onChange={(e)=>setMessage(e.target.value)}/>
                    <div className='h-10 w-50 relative flex-center'>
                        {loading ? 
                            <div className="flex-center w-full flex-col">
                                {success ? 
                                <Lottie className='h-16 w-16' animationData={successAnimation} loop={false} />
                                :
                                <Lottie className='h-20 w-20' animationData={LoadingElephant} loop={true} />
                                }
                            </div>
                            :
                            <button className='px-6 w-full bg-blue-600 hover:bg-blue-700 
                            border borderColor hover:shadow-lg transition-Smooth cursor-pointer
                            p-2 rounded text-white flex-center gap-2'
                            onClick={sendMessage}
                            >
                                <MdSendToMobile className='h-6 w-6'/>
                                Send
                            </button>
                        }
                    </div>
                    
                </div>
            </div>
            <div className='grid lg:flex items-center justify-between gap-4 lg:gap-32'>
                <div className='flex flex-col gap-2 md:gap-2'>
                    <h2 className='font-bold'>Visit More Link</h2>
                    <div className='grid gap-1 md:justify-between'>
                        <Link  title='Complete'  href={'https://phurpasherpa-portfolio.netlify.app/'} target='blank'
                        className='flex items-center gap-2 hover:underline transition-Smooth'>Portfolio
                            <FaExternalLinkAlt className='h-3 w-3'/>
                        </Link>
                        <Link href={'/'} title='In Progress' className='flex items-center gap-2 hover:underline transition-Smooth'>CV Maker
                            <FaExternalLinkAlt className='h-3 w-3'/>
                        </Link>
                        <Link href={'/'}  title='In Progress'  className='flex items-center gap-2 hover:underline transition-Smooth'>Re-design Works
                            <FaExternalLinkAlt className='h-3 w-3'/>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:gap-1'>
                    <h2 className='font-bold'>Follow me on</h2>
                    <div className='flex gap-4 md:justify-between'>
                        <Link href={'/'}><FaLinkedin className='h-6 w-6'/></Link>
                        <Link href={'/'}><FaGithub className='h-6 w-6'/></Link>
                        <Link href={'/'}><FaInstagram className='h-6 w-6'/></Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='text-center text-[var(--textColor)] pt-4 border-t-1 borderColor'>
            <span>Real solutions. Real code. No fluff. <br />
<span className='text-[var(--flat)] font-medium'>© 2025 Phurpa Sherpa.</span> Built with Next.js, Tailwind, and GSAP.</span>
        </div>
    </div>
  )
}
