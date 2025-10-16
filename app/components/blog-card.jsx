'use client'
import React, { useEffect, useRef } from 'react'
import { CgCalendarDates } from "react-icons/cg";
import gsap from 'gsap';
import Link from 'next/link';


export default function BlogCard({blog}) {
    const cardRef = useRef(null);
    const buttonRef = useRef(null);
    const hrRef = useRef(null);


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


    const tech = [
        {name: "react", src: '/react.svg'},
        {name: "js", src: '/js.svg'},
        {name: "gsap", src: '/gsap.svg'},
    ]

    return (
        <div ref={cardRef} className='w-100 overflow-hidden grid card shadow-lg bg-gray-400/5 rounded-lg hover:shadow-2xl transition-shadow duration-300'>
            <div className='cardImage w-fit overflow-hidden relative'>
                <img src={blog.image || "https://images.unsplash.com/photo-1526779259212-939e64788e3c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000"} 
                alt="react image"
                className='h-50 w-100 object-cover relative'
                />
                <Link href={`/blog/${blog.id}`} ref={buttonRef} className='button cursor-pointer absolute z-10 bottom-5 right-5 text-black bg-white/70 backdrop-blur-lg
                px-4 py-2 rounded-full font-medium'>
                    Read More
                </Link>
            </div>
            <div className='grid gap-2 w-fit px-4 py-4 bg-gray-400/10'>
                <div className='flex-center w-fit gap-2'>
                    <CgCalendarDates className='h-4 w-4'/>
                    <span>{blog.date || '6 Oct 2024'}</span>
                    <span className='bg-black/60 w-1 h-1 rounded-full'></span>
                    <span>{blog.read_time || '3'} min read</span>
                </div>
                <div className='flex items-center w-full gap-4 '>
                    <span className='italic font-medium'>{blog.author || 'Phurpa Sherpa'}</span>
                    <div className='flex-center gap-2'>
                        {tech.map((icon, index)=>(
                        <div className='p-2 bg-black/60 rounded-full' key={index}>
                            <img className='h-6 w-6' src={icon.src} alt={icon.name}/>
                        </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className='w-fit'>
                        <Link  href={`/blog/${blog.id}`} className='cursor-pointer font-medium'>{blog.title}</Link>
                        <div ref={hrRef} className='w-full h-1 border-t-2'/>
                    </div>
                    <p className='text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ipsum ipsa doloribus! Vel enim veniam. 
                        Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
        </div>
    )
}
