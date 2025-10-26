import React from 'react'
import loadingAnimation from '@/public/Loading.json'
import Lottie from 'lottie-react';
import { useAuth } from '../auth/AuthContext';

export default function Loading() {
  const {logout} = useAuth();
  
  return (
    <div className='h-screen absolute bg-black/10 w-full top-0 flex-center backdrop-blur-2xl'>
      <div className='flex-center flex-col'>
        <Lottie className='h-42 scale-200 w-42' animationData={loadingAnimation} loop={true} />
      </div>
       <button className='absolute bottom-0' onClick={logout}>Click</button>
    </div>
  )
}
