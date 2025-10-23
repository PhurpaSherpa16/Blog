'use client'
import React, { useState } from 'react'
import { MdFileUpload } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { useAuth } from '../auth/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';


export default function PostCards() {
    const {user, userData} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    

    const [post, setPost] = useState({
        title : '',
        description: '',
        imageURL : '',
        content : '',
    })

    const postHandleChange = (e)=>{
        setPost({
            ...post, [e.target.name] : e.target.value
        })
    }

    const savePost = async (e) =>{
        e.preventDefault()
        setError(null)
        setLoading(true)
        const postid = `${user.uid}_${Date.now()}`
        if(post.title === ''
            || post.description === ''
            || post.imageURL === ''
            || post.content === ''){
            setError('Please, enter the required field')
            return
        }
        try{
            await setDoc(doc(db, 'blogs',postid),{
                title : post.title,
                description : post.description,
                imageURL : post.imageURL,
                author : userData.fullName,
                createdAt: new Date(),
                content : post.content,
                userId : user.uid
            })
            console.log('Post Save')
            alert('Post Save')
            router.push("/admin");
        }
        catch(error){
            console.log('post unsave: ',error)
            setError("Post save unsuccessful. Pleasem try again.")
        }
        finally{
            setLoading(false)
        }
    }
    

  return (
    <form>
        <div className='grid gap-4 w-full'>
        <div className='grid w-full gap-4'>
            <div className='w-full'>
                <div className='grid'>
                    <label>Post Title</label>
                    <input type="text" name='title' required placeholder='Title of Post' className='border-1 border-gray-300 p-2 rounded-lg w-1/2'
                    onChange={postHandleChange}/>
                </div>
                <div className='grid'>
                    <label>Post Description</label>
                    <input type="text" name='description' required placeholder='Post Description' className='border-1 border-gray-300 p-2 rounded-lg w-1/2'
                    onChange={postHandleChange}/>
                </div>
                <div className='grid'>
                    <label>Image</label>
                    <input type="text" name='imageURL' required placeholder='Image URL' className='border-1 border-gray-300 p-2 rounded-lg w-1/2'
                    onChange={postHandleChange}/>
                </div>
            </div>
            <div className='grid w-full'>
                <label>Content</label>
                <textarea type="text" name='content' required rows={24} placeholder='Content' className='border-1 border-gray-300 p-2 rounded-lg'
                onChange={postHandleChange}/>
            </div>
        </div>
        <div className='flex gap-4 w-1/2'>
            <button disabled={loading}
            onClick={savePost}
            className='w-3/5 flex items-center cursor-pointer justify-center gap-2 bg-green-700 py-2 px-16 rounded-lg text-white'>
                Add<MdFileUpload className='w-5 h-5'/>
            </button>
            <button disabled={loading} className='w-1/5 flex gap-2 cursor-pointer items-center justify-center bg-gray-400 py-2 px-16 rounded-lg text-white'>
                Reset<GrPowerReset className='w-5 h-5'/>
            </button>
        </div>
        <p className='text-red-500'>{error || ''}</p>
        </div>
    </form>
  )
}
