import RegisterPosts from '@/app/components/admin/RegisterPosts'
import React from 'react'

export default function page() {
  return (
    <div>
        <div className='grid gap-8 px-4 md:py-16'>
          <div>
            <span className='text-[var(--textColor)]'>Start Writing Your Post</span>
            <h1>Share your thoughts — fill in the details and hit publish when ready</h1>
          </div>
          <RegisterPosts/>
        </div>
    </div>
  )
}
