"use client";
import { useTheme } from "next-themes";

import React, { useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";
import gsap from "gsap";

export default function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const stars = useRef(null);
  const moonRef = useRef(null);
  const ray = useRef(null);
  const ray1 = useRef(null);
  const ray2 = useRef(null);
  const ray3 = useRef(null);
  const ray4 = useRef(null);
  const ray5 = useRef(null);
  const ray6 = useRef(null);
  const ray7 = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      gsap.to(moonRef.current, {
        xPercent: 40,
        yPercent: -40,
        ease: "power2.inOut",
      });
      gsap.to(stars.current, {
        scale: 0.8,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray.current, {
        scale: 0,
        xPercent: 100,
        yPercent: 250,
        ease: "power2.inOut",
      });
      gsap.to(ray1.current, {
        scale: 0,
        xPercent: -100,
        yPercent: -100,
        ease: "power2.inOut",
      });
      gsap.to(ray2.current, {
        scale: 0,
        xPercent: -100,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray3.current, {
        scale: 0,
        xPercent: 200,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray4.current, {
        scale: 0,
        xPercent: 200,
        yPercent: -100,
        ease: "power2.inOut",
      });
      gsap.to(ray5.current, {
        scale: 0,
        xPercent: -200,
        yPercent: -100,
        ease: "power2.inOut",
      });
      gsap.to(ray6.current, {
        scale: 0,
        xPercent: -200,
        yPercent: 100,
        ease: "power2.inOut",
      });
      gsap.to(ray7.current, {
        scale: 0,
        xPercent: 200,
        yPercent: 100,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(moonRef.current, {
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(stars.current, {
        xPercent: -50,
        yPercent: 90,
        scale: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray1.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray2.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray3.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray4.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray5.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray6.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
      gsap.to(ray7.current, {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "power2.inOut",
      });
    }
  }, [theme]);

  return (
    <div className='relative scale-50 w-fit'>
      <button className='cursor-pointer' onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        <div className='h-20 w-20 rounded-full flex items-center justify-center relative'>
          <div className='h-full w-full flex items-center justify-center relative'>
            <BsStars ref={stars} className='absolute text-white
                  scale-0 bottom-15 right-0 h-10 w-10'/>
            <div className='h-10 w-10 bg-white rounded-full relative z-10 overflow-hidden
                  rotate-15'>
              <div ref={moonRef} className={`absolute z-100 w-10 h-10 bg-[#141419] rounded-full `} />
            </div>
            <div ref={ray} className='bg-black h-1.5 w-1.5 absolute rounded-full top-2 ' />
            <div ref={ray1} className='bg-black h-1.5 w-1.5 absolute rounded-full bottom-2' />
            <div ref={ray2} className='bg-black h-1.5 w-1.5 absolute rounded-full right-2 rotate-90' />
            <div ref={ray3} className='bg-black h-1.5 w-1.5 absolute rounded-full left-2 rotate-90' />
            <div ref={ray4} className='bg-black h-1.5 w-1.5 absolute rounded-full left-4 bottom-4 rotate-45' />
            <div ref={ray5} className='bg-black h-1.5 w-1.5 absolute rounded-full right-4 bottom-4 -rotate-45' />
            <div ref={ray6} className='bg-black h-1.5 w-1.5 absolute rounded-full right-4 top-4 rotate-45' />
            <div ref={ray7} className='bg-black h-1.5 w-1.5 absolute rounded-full left-4 top-4 -rotate-45' />
          </div>
        </div>
      </button>
    </div >
  );
}
