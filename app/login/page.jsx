'use client'
import manRocket from '@/public/man.json'
import Lottie from 'lottie-react';

import LoginForm from "../components/LoginForm";
import UserRegisterForm from '../components/UserRegisterForm';
import { useState } from 'react';




export default function LoginPage() {
  const [loginRegister, setLoginRegister] = useState(false)

  return (
    <>
    <div className="relative flex flex-col lg:flex-row py-8 lg:pt-24 2xl:pt-42 justify-center items-center lg:items-start lg:justify-between px-4 md:container mx-auto gap-8">
      <div className="relative h-fit">
        <h1>
          <span className="text-2xl md:text-4xl tracking-wider">Sign in to continue</span><br />
          <span className="text-[20vw] md:text-[13vw] lg:text-[10vw] uppercase font-black">
            <span className="relative z-20">your</span> <br/>
            <span className="relative z-40">journey</span>
          </span>
        </h1>
        <div className="w-fit absolute z-30 bottom-0 2xl:bottom-10 -right-8 md:-right-15 2xl:right-0">
          <Lottie className='h-60 w-60 md:h-80 md:w-80 lg:h-120 lg:w-120' animationData={manRocket} loop={true} />
        </div>
        <span className="text-[var(--textColor)] tracking-tight">***We never share your information</span>
      </div>
      {
        loginRegister ?
        <LoginForm setLoginRegister={setLoginRegister}/>
        :
        <UserRegisterForm setLoginRegister={setLoginRegister}/>
      }
    </div>
    </>
  );
}
