'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import BlogNavbar from './blogNavbar'

export default function Navbarwrapper() {
    const pathname = usePathname()

    const isAdmin = pathname.startsWith('/admin')

    if (isAdmin) return null 
    return <BlogNavbar/>
}
