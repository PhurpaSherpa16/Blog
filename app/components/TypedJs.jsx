'use client'
import React, { useRef } from 'react';
import Typed from 'typed.js';

export default function TypedJs() {
    const element = useRef(null);
    React.useEffect(() => {
    const typed = new Typed(element.current, {
      strings: [
  'No fluff, just working Next.js apps',
  'React interfaces that actually work',
  'Tailwind layouts done right',
  'Animations that impress with GSAP',
  'Minimal design, maximum clarity',
  'Fixes & solutions explained simply'],
      typeSpeed: 75,
      loop: true,
      backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return <span ref={element} />
}
