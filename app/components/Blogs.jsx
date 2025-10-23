'use client'
import React, { useState } from 'react'
import BlogCard from './blog-card'
import { useBlogs } from '@/lib/RealtimeBlogFetch'

export default function page() {
    const blogs = useBlogs()
    if(!blogs){
        return <div className='container mx-auto py-8'>Post dont have data</div>
    }

  return (
    <div className='cardDiv gap-8'>
      {blogs.map((item, index)=>(
        <div key={index}>
          <BlogCard blog={item}/>
        </div>
      ))}
    </div>
  )
}
