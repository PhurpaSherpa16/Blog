'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineMenuUnfold } from "react-icons/ai";
import UserProfile from '@/app/components/userProfile'
import Link from 'next/link';
import { BiLogOut } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { MdPostAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import ThemeSwitch from '../theme/Switch';


export default function MobileAdminNavbar({userData, logout}) {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(()=>{
        const onScroll = () =>{
          setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', onScroll)
        return ()=> window.removeEventListener('scroll', onScroll)
      },[])


  return (
    <div className={`relative grid gap-4 md:hidden py-8
    ${scrolled ? 'bg-[var(--whiteBlack)] shadow-2xl' :'bg-[var(--background)] shadow-none'}
      `}>
        <div className='relative flex justify-between items-center px-8'>
          <div className='w-1/2'>
            <UserProfile userData={userData} height={60} width={60}/>
          </div>
          <div className='flex justify-end shadow w-fit p-2 rounded-full'>
            <AiOutlineMenuUnfold className='h-8 w-8' onClick={()=>setMenuOpen((p)=>!p)}/>
          </div>
        </div>

        {/* Menu List */}
      {menuOpen && 
        <div className={`absolute grid w-full pb-8 top-30 border-b-1 borderColor 
        bg-[var(--whiteBlack)] shadow-2xl
        `}>
          <Link href="/admin" 
          className={`py-4 ${pathname === "/admin" ? "bg-[var(--redColor)] text-white" 
          : "hover:bg-[var(--menuBackgroundColor)] hover:text-[var(--flat)]"}
        transition-all duration-300`}
        onClick={()=>setMenuOpen((p)=>!p)}>
            <span className="flex items-center gap-2 admin-padding-inLine">
              <GoHomeFill className="w-5 h-5" /> Home
            </span>
          </Link>

          <Link href="/admin/posts" className={`py-4 ${pathname === "/admin/posts" ? 
          "bg-[var(--redColor)] text-white" 
          : "hover:bg-[var(--menuBackgroundColor)] hover:text-[var(--flat)]"}
         transition-all duration-300`}
         onClick={()=>setMenuOpen((p)=>!p)}>
            <span className="flex items-center gap-2 admin-padding-inLine">
              <MdPostAdd className="w-5 h-5" /> Add Post
            </span>
          </Link>

          <Link href="/admin/profile-edit" className={`py-4 ${pathname === "/admin/profile-edit" ? 
          "bg-[var(--redColor)] text-white" 
          : "hover:bg-[var(--menuBackgroundColor)] hover:text-[var(--flat)]"}
          transition-all duration-300`}
          onClick={()=>setMenuOpen((p)=>!p)}>
            <span className="flex items-center gap-2 admin-padding-inLine">
              <FaUserEdit className="w-5 h-5" /> Edit Profile
            </span>
          </Link>
          
          <button onClick={logout} className={`py-4 hover:bg-[var(--menuBackgroundColor)] 
          hover:text-[var(--textColor)]}
                transition-all duration-300`}>
            <span className="flex items-center gap-2 admin-padding-inLine">
              <BiLogOut className="w-5 h-5" /> Logout
            </span>
          </button>
          
          <div className='flex px-8 items-center justify-between pt-4'>
            <div className='grid'>
              <span className='uppercase font-bold'>{userData.fullName}</span>
              <div className='text-[var(--textColor)]'>
                <span className='border-l-4 border-[var(--redColor)] pl-2'>
                  {userData.profession.split(' ').slice(0,2).join(" ") + " ..."}
                  </span>
                <br />
                <span className='font-medium'>{userData.email}</span>
              </div>
            </div>
            <div className='flex justify-end'>
              <ThemeSwitch/>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
