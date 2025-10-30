'use client'
import Link from 'next/link'
import React from 'react'
import panda from '@/public/panda.json'
import Lottie from 'lottie-react';

export default function NotFound() {
  return (
    <div className="relative h-fit w-full  overflow-hidden">
      <div className="relative z-10 h-full flex-center">
        <div className="flex-center flex-col">
          <div className="relative flex items-center justify-center h-40 md:h-60 lg:h-90 w-full">
            <Lottie className='absolute h-60 w-60 md:h-80 md:w-80 lg:h-120 lg:w-120' animationData={panda} loop={true} />
          </div>
          <div className="flex-center flex-col gap-2">
            <h1 className="text-4xl font-bold">Page Not Found</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
