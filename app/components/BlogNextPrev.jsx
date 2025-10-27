'use client'
import { useBlogsLite } from '@/lib/RealtimeBlogFetch'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";



export default function BlogNextPrev({blogid}) {
    const tempBlog = useBlogsLite();

    const { prevPost, nextPost } = useMemo(() => {
        if (!tempBlog || tempBlog.length === 0) return {};
        const currentIndex = tempBlog.findIndex(b => b.id === blogid);
        if (currentIndex === -1) return {};

        return {
        prevPost: currentIndex > 0
            ? tempBlog[currentIndex - 1]
            : tempBlog[tempBlog.length - 1],

        nextPost: currentIndex < tempBlog.length - 1
            ? tempBlog[currentIndex + 1]
            : tempBlog[0],
        };
    }, [tempBlog, blogid]);

  if (!prevPost || !nextPost) return null;

  return (
    <div className='padding-inLine py-8 grid gap-4'>
        <h1>Explore more articles</h1>
        <div className='grid md:flex gap-4 justify-between'>
            {prevPost &&
            <Link href={`/blog/${prevPost.id}`} className='cursor-pointer flex items-center gap-4 font-medium
            bg-[var(--whiteBlack)] border borderColor shadow p-4 rounded transition-Smooth hover:shadow-lg'>
                <GrFormPreviousLink className='h-8 w-8'/>
                <div className='flex lg:gap-2 items-center gap-4'>
                    <div>
                        <img src={ prevPost.imageURL? prevPost.imageURL : '/image.png'} alt="image" className='h-20 w-40 object-cover rounded'/>
                    </div>
                    <div className='flex flex-col justify-end'>
                        <span>
                            {prevPost.title.split(" ").length <= 3 ? prevPost.title : prevPost.title.split(" ").slice(0,3).join(" ") + " ..."}
                        </span>
                        <span className='border-l-4 italic pl-2 uppercase text-[var(--textColor)]'>
                            {prevPost.author.split(" ").length <= 2 ? prevPost.author : prevPost.author.split(" ").slice(0,2).join(" ") + " ..."}
                        </span>
                    </div>
                </div>
            </Link>
            } 
            
            {nextPost &&
            <Link  href={`/blog/${nextPost.id}`} className='cursor-pointer flex items-center gap-4 font-medium
            bg-[var(--whiteBlack)] border borderColor shadow p-4 rounded transition-Smooth hover:shadow-lg'>
                <div className='flex lg:gap-2 items-center gap-4'>
                    <div className='flex flex-col justify-end'>
                        <span>
                            {nextPost.title.split(" ").length <= 3 ? nextPost.title : nextPost.title.split(" ").slice(0,3).join(" ") + " ..."}
                        </span>
                        <span className='border-l-4 italic pl-2 uppercase text-[var(--textColor)]'>
                            {nextPost.author.split(" ").length <= 2 ? nextPost.author : nextPost.author.split(" ").slice(0,2).join(" ") + " ..."}
                        </span>
                    </div>
                    <div>
                        <img src={ nextPost.imageURL? nextPost.imageURL : '/image.png'} alt="image" className='h-20 w-40 object-cover rounded'/>
                    </div>
                </div>
                <GrFormNextLink className='h-8 w-8'/>
            </Link>
            }
        </div>
    </div>
  )
}
