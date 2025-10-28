'use client'
import React, { useEffect, useRef } from 'react'
import { CgCalendarDates } from "react-icons/cg";
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RedableDate from './redableDate';


export default function BlogCard({blog}) {
    const cardRef = useRef(null);
    const buttonRef = useRef(null);
    const hrRef = useRef(null);

    const location = usePathname()

    useEffect(()=>{
        const card = cardRef.current;
        const button = buttonRef.current;
        const hr = hrRef.current;

        gsap.set(button, {yPercent: 100, autoAlpha: 0});
        gsap.set(hr, {scaleX: 0, transformOrigin: "center"});

        card.addEventListener('mouseenter', ()=>{
            gsap.to(button, {yPercent: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out"});
            gsap.to(hr, {scaleX: 1, duration: 0.3, ease: "power2.out"});
        })
        card.addEventListener('mouseleave', ()=>{
            gsap.to(button, {yPercent: 100, autoAlpha: 0, duration: 0.3, ease: "power2.out"});
            gsap.to(hr, {scaleX: 0, duration: 0.3, ease: "power2.out"});
        })
        
        return ()=>{
            card.removeEventListener('mouseenter', ()=>{});
            card.removeEventListener('mouseleave', ()=>{});
        }

    },[])

    const words = blog.content.split(/\s+/)
    const readTime = words[0] === '' ? 0 : Math.ceil(words.length / 70)

    const tech = [
        {name: "react", src: '/react.svg'},
        {name: "js", src: '/js.svg'},
        {name: "gsap", src: '/gsap.svg'},
    ]

    return (
        <div ref={cardRef} className='relative w-full overflow-hidden grid card shadow
        h-fit border-1 borderColor
        bg-gray-400/5 rounded-lg hover:shadow-lg transition-shadow duration-300'>
            <div className='cardImage w-full overflow-hidden relative'>
                <img src={blog.imageURL} 
                alt="react image"
                className='h-60 w-full object-cover relative'
                />

                {
                    location === '/admin' ?
                    <Link href={`/admin/blog/${blog.id}`} ref={buttonRef} className='button cursor-pointer absolute z-10 bottom-5 right-5 text-black bg-white/70 backdrop-blur-lg
                    px-4 py-2 rounded-full font-medium'>
                        View Post
                    </Link>
                    :
                    <Link href={`/blog/${blog.id}`} ref={buttonRef} className='button cursor-pointer absolute z-10 bottom-5 right-5 text-black bg-white/70 backdrop-blur-lg
                    px-4 py-2 rounded-full font-medium'>
                        Read More
                    </Link>
                }
            </div>
            <div className='flex flex-col gap-2 h-full w-full px-4 py-4 bg-gray-400/10'>
                <div className='flex-center w-fit gap-2'>
                    <CgCalendarDates className='h-4 w-4'/>
                    <span><RedableDate date={blog.createdAt} /></span>
                    <span className='bg-black/60 w-1 h-1 rounded-full'></span>
                    <span>{readTime} min read</span>
                </div>
                <div className='flex items-center w-full gap-4 '>
                    <span className='italic font-medium'>{blog.author || 'Phurpa Sherpa'}</span>
                    {/* <div className='flex-center gap-2'>
                        {tech.map((icon, index)=>(
                        <div className='p-2 bg-black/60 rounded-full' key={index}>
                            <img className='h-6 w-6' src={icon.src} alt={icon.name}/>
                        </div>
                        ))}
                    </div> */}
                </div>
                <div>
                    <div className='w-fit'>
                        {
                            location === '/admin' ?
                            <Link  href={`/admin/blog/${blog.id}`} className='cursor-pointer font-medium'>
                                {blog.title.split(" ").length <= 5 ? blog.title : blog.title.split(" ").slice(0,6).join(" ") + " ..."}
                                </Link>
                            :
                            <Link  href={`/blog/${blog.id}`} className='cursor-pointer font-medium'>
                                {blog.title.split(" ").length <= 5 ? blog.title : blog.title.split(" ").slice(0,6).join(" ") + " ..."}
                            </Link>
                        }
                        <div ref={hrRef} className='w-full h-1 border-t-2'/>
                    </div>
                    {/* <p className='text-justify'>{blog.description.split(" ").slice(0,15).join(" ") + " ..."}</p> */}
                </div>
            </div>
        </div>
    )
}
