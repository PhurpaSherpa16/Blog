'use client'
import React, { useContext, useState } from 'react'
import { MdFileUpload } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

import { useAuth } from '../auth/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { AlertContext } from './AlertContext';
import Loading from '@/app/components/admin/Loading';


export default function PostCards() {
    const {user, userData} = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(true)

    const router = useRouter();
    const {setMessage} = useContext(AlertContext)
    

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
        if(post.title === ''
            || post.description === ''
            || post.imageURL === ''
            || post.content === ''){
                setError('Please, enter the required field')
                setDisable(true)
            }
        else{
            setError('')
            setDisable(false)
        }
    }

    const savePost = async (e) =>{
        e.preventDefault()
        setError(null)
        const postid = `${user.uid}_${Date.now()}`
        if(post.title === ''
            || post.description === ''
            || post.imageURL === ''
            || post.content === ''){
                setError('Please, enter the required field')
                return
            }
            else{
                setLoading(true)
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
                    setLoading(false)
                    router.push("/admin");
                    setMessage('Post published.')
                }
                catch(error){
                    setLoading(false)
                    console.log('post unsave: ',error)
                    setError("Post save unsuccessful. Pleasem try again.")
                }
            }
    }
    
    if(loading) return <Loading/>

  return (
    <form className='p-4 background rounded-lg'>
        <div className='grid gap-4 w-full'>
        <div className='grid w-full gap-4'>
            <div className='w-full'>
                <div className='grid'>
                    <label>Post Title</label>
                    <input type="text" name='title' required placeholder='Title of Post' className='border-2 borderColor p-2 rounded-lg md:w-1/2'
                    onChange={postHandleChange}/>
                </div>
                <div className='grid'>
                    <label>Post Description</label>
                    <input type="text" name='description' required placeholder='Post Description' className='border-2 borderColor p-2 rounded-lg md:w-1/2'
                    onChange={postHandleChange}/>
                </div>
                <div className='grid'>
                    <label>Image</label>
                    <input type="text" name='imageURL' required placeholder='Image URL' className='border-2 borderColor p-2 rounded-lg md:w-1/2'
                    onChange={postHandleChange}/>
                </div>
            </div>
            <div className='grid w-full'>
                <label>Content</label>
                <textarea type="text" name='content' required rows={24} placeholder='Content' className='border-2 borderColor p-2 rounded-lg'
                onChange={postHandleChange}/>
            </div>
        </div>
        <div className='grid md:flex gap-4 md:w-1/2'>
            <button disabled={disable}
            type='button'
            onClick={savePost}
            className='w-full flex items-center cursor-pointer justify-center gap-2 bg-green-400 
            disabled:bg-gray-400 disabled:cursor-not-allowed hover:text-white button hover:bg-green-500'>
                <MdFileUpload className='w-5 h-5'/>
                Publish Blog 
            </button>
            <button disabled={loading} className='button w-full flex gap-2 cursor-pointer items-center 
            justify-center bg-gray-400 hover:bg-gray-500 hover:text-white  button'>
                <GrPowerReset className='w-5 h-5'/>
                Reset
            </button>
        </div>
        <p className='text-red-500'>{error || ''}</p>
        </div>
    </form>
  )
}
