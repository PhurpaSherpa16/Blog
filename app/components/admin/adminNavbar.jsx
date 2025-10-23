"use client";
import React from 'react'
import ThemeSwitch from '../theme/Switch'
import { useAuth } from '../auth/AuthContext';
import Image from 'next/image';
import { BiLogOut } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import { MdPostAdd } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function AdminNavbar() {
  const { loading, logout, userData} = useAuth();
  const pathname = usePathname()

  if (loading) return <p>Loading...</p>;
  if (!userData) return

  return (
    <div className='h-screen overflow-hidden adminNavbar'>
      <div className='h-full flex flex-col justify-between pt-16'>
        <div className='grid gap-8'>
          <div className='admin-padding-inLine'>
            <div className='overflow-hidden bg-[#ff4d00] w-fit rounded-full'>
              <Image
              className='object-cover'
              src={'/avatar_boy.png'}
              height={150}
              alt='logo'
              width={150}
              />
            </div>
            <div className='grid'>
              <span className='uppercase font-bold text-2xl'>{userData.fullName}</span>
              <div className='text-[var(--textColor)]'>
                <span className='border-l-4 border-[var(--redColor)] pl-2'>{userData.profession}</span>
                <br />
                <span>{userData.email}</span>
              </div>
            </div>
          </div>

         <div className='grid'>

            <Link href="/admin" className={`py-4 ${pathname === "/admin" ? "bg-[var(--menuBackgroundColor)]" : ""}
            hover:bg-[var(--redColor)] hover:text-white transition-all duration-300`}>
              <span className="flex items-center gap-2 admin-padding-inLine">
                <GoHomeFill className="w-5 h-5" /> Home
              </span>
            </Link>

            <Link href="/admin/posts" className={`py-4 ${pathname === "/admin/posts" ? "bg-[var(--menuBackgroundColor)]" : ""}
            hover:bg-[var(--redColor)]  hover:text-white transition-all duration-300`}>
              <span className="flex items-center gap-2 admin-padding-inLine">
                <MdPostAdd className="w-5 h-5" /> Add Post
              </span>
            </Link>

            <Link href="/admin/profile-edit" className={`py-4 ${pathname === "/admin/profile-edit" ? "bg-[var(--menuBackgroundColor)]" : ""}
            hover:bg-[var(--redColor)]  hover:text-white transition-all duration-300`}>
              <span className="flex items-center gap-2 admin-padding-inLine">
                <FaUserEdit className="w-5 h-5" /> Edit Profile
              </span>
            </Link>
          </div>

        </div>
        <div className='bg-[var(--menuBackgroundColor)] flex h-fit justify-between items-center admin-padding-inLine'>
          <button onClick={logout} className='flex items-center gap-2 cursor-pointer px-3 py-1 rounded-2xl
          hover:bg-[var(--redColor)]  hover:text-white transition-all duration-300'>
            <BiLogOut className='w-5 h-5'/>Logout 
          </button>
          <div className='scale-60 rounded-full hover:bg-[var(--themeHover)] transition-all duration-300'>
            <ThemeSwitch/>
          </div>
        </div>
      </div>
    </div>
  )
}
