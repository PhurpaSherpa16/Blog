import React from 'react'
import Switch from './theme/Switch'
import Image from 'next/image'
import Link from 'next/link'

export default function blogNavbar() {
  return (
    <div className='padding-inLine py-4 relative'>
      <div className='flex justify-between items-center'>
        <Link href={'/'} className='flex gap-1 items-center justify-center'>
          <Image src={'/icon.svg'} width={32} height={32} alt='logo' />
          <h1 className='menuLogo'>Blog</h1>
        </Link>
        <Switch />
      </div>
    </div>
  )
}
