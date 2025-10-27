import React, { useRef, useState } from 'react'
import gsap from "gsap";
import { IoIosCloseCircle } from 'react-icons/io';

export default function ProfileImageChange({formData, setFormData}) {
    
    const [avatarDiv, setAvatarDiv] = useState(false)
    const updateButton = useRef(null);

    const profileImage = formData.image ? `/${formData.image}.png` : '/user.png'

    const handleEnter = () => {
        gsap.to(updateButton.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out"
        });
    };

    const handleLeave = () => {
        gsap.to(updateButton.current, {
        yPercent: 100,
        duration: 0.4,
        ease: "power3.in"
        });
    }; 

    const images = [
        {name:'avatar_boy', src:'/avatar_boy.png', color:'#ff4d00'},
        {name:'avatar_girl', src:'/avatar_girl.png', color:'#a2ff00'},
        {name:'avatar_with_beard', src:'/avatar_with_beard.png', color:'#0d00ff'},
    ]

  return (
    <div className="full flex-center relative h-fit">
        <div onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`relative overflow-hidden 
        ${profileImage === '/user.png' ? 'bg-[#ffffff]' : 'bg-[#ff4d00] ' } 
        w-fit rounded-full`}>
        <img src={profileImage} alt="Profile Image"
        style={{ backgroundColor: formData?.color }}
        className='h-40 w-40 relative object-cover'/>
        <button ref={updateButton} className='text-white
        bg-black/20 backdrop-blur-2xl absolute bottom-0 left-0 p-4 w-full cursor-pointer'
        onClick={()=>setAvatarDiv((p)=>!p)}
        >Update</button>
        </div>
        {avatarDiv &&
        <div className='absolute -bottom-35 bg-[var(--whiteBlack)] p-6 border-1 border-[var(--border)] 
        rounded-lg z-20'>
            <span className='text-[var(--textColor)]'>Choose Avatar</span>
            <div className='absolute right-2 top-2 cursor-pointer'
            onClick={()=>setAvatarDiv(false)}>
            <IoIosCloseCircle/>
            </div>
            <div className='flex gap-4 pt-4'>
            {images.map((item, index)=>(
            <div key={index} style={{ backgroundColor: item.color }} className={` 
            shadow-md hover:shadow-xl hover:scale-110 cursor-pointer transition-all duration-300
            rounded-full overflow-hidden relative`}>
                <img src={item.src} alt={item.name}
                className='h-12 w-12 relative'
                onClick={()=>setFormData(prev =>({...prev, image: item.name, color: item.color}))}/>
            </div>
            ))}
            </div>
        </div>
        }
    </div>
  )
}
