import PostCards from '@/app/components/admin/PostCards'
import React from 'react'

export default function page() {
  return (
    <div className='py-16 min-h-screen flex items-center justify-center w-full'>
      <div className='admin-padding-inLine w-full'>
          <h1 className='font-serif'>Add Post</h1>
          <PostCards/>
      </div>
    </div>
  )
}
