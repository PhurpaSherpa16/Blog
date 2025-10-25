import Image from 'next/image'
import React from 'react'

export default function userProfile({userData, height=150, width=150}) {

  const profileImage = userData.image?`/${userData.image}.png`:'/user.png'

  return (
    <div className={`overflow-hidden w-fit rounded-full`}
    style={{ backgroundColor: userData.color }}>
        <Image
        className='object-cover'
        src={profileImage}
        height={height}
        alt='logo'
        width={width}
        />
    </div>
  )
}
