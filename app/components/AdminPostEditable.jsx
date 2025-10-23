"use client";
import { db } from '@/lib/firebase';
import { deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import Lottie from 'lottie-react';
import animation from '@/public/success.json'
import { FaQuestionCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useAuth } from './auth/AuthContext';



export default function AdminPostEditable({ contentHtml, blog }) {
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteProjectName, setDeleteProjectName] = useState(null)
  const router = useRouter()
  const {setLoading} = useAuth()

   const [post, setPost] = useState({
          title : blog.title,
          description: blog.description,
          imageURL : blog.imageURL,
          content : blog.content,
      })
  
  console.log(blog.createdAt)

  const handleChnage = (e) =>{
      setPost({
        ...post, [e.target.name] : e.target.value
      })
  }

  const descriptionClick = (e) =>{
        setIsEditing(e)
  }

  const onHandleCancel = ()=>{
    setIsEditing(null)
    setPost(blog)
  }

  const handleConfirmation = (e) =>{
    if (e){
        setConfirm(true)
        updatePost()
        return
      }
      return null
  }

  const updatePost = async () =>{
      try{
        const result = doc(db, 'blogs', blog.id)
        await updateDoc(result, post)
      }
      catch(error){
        setError('Failed update.')
      }
  }

  const deletePost = async() =>{
      console.log(deleteProjectName, blog.title)
      if (deleteProjectName === blog.title){
        try{
          const ref = doc(db, 'blogs', blog.id)
          await deleteDoc(ref)
          router.push('/admin')
        }
        catch(error){
          console.log('Error')
          setError('Failed to Delete')
        }
      }
      return null
  }

  const updatedPost = () =>{
    setModal(false)
    setConfirm(false)
    setIsEditing(false)
    setError(null)
  }
  
  return (
    <div className='relative w-full'>
      {/* When Update Button Click, notification modal */}
      { modal ?
          <div className='fixed flex-center h-full w-8/10 bg-black/30 z-10 backdrop-blur-lg'>
              <div className='min-w-85 min-h-30 bg-[var(--background)] p-4 rounded-lg flex flex-col gap-4'>
                {confirm ? 
                <div className='flex flex-col gap-4'>
                  <div className='w-full flex-center'>
                  <Lottie className='h-24 w-24' animationData={animation} loop={false} />
                  </div>
                  <div className='w-full flex justify-center text-center'>
                  <span>
                  Your Post Updated. <br />
                  <button className='text-blue-500 hover:underline cursor-pointer'
                  onClick={updatedPost}>Go Back</button>
                  </span>
                  </div>
                  </div>
                :
                <div>
                  <span className='text-[var(--textColor)]'>Message</span>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <span className='font-medium'>Are You Sure, Want to update this post?</span>
                    </div>
                    <div className='flex gap-4'>
                      <button className='saveButton font-bold cursor-pointer bg-green-500 text-white'
                        onClick={()=>handleConfirmation(true)}>Yes</button>
                        <button className='saveButton hover:bg-red-500 cursor-pointer bg-gray-500/60 text-white'
                        onClick={()=>setModal(false)}>No</button>
                    </div>
                </div>
                </div>
                  }
              </div> 
          </div>
          : ''
        }
      <div className="relative py-8 w-full px-8 grid gap-4">
      <div className='pb-8'>
        <span className='text-[var(--textColor)]'>You’re editing this post</span>
        <h1>Edit Blog Entry</h1>
      </div>
      <div className='relative grid gap-4 w-1/2 border-1 rounded-lg p-4 border-[var(--inputBorder)]'>
        <div className='relative flex justify-between w-full'>
          <span className='text-[var(--textColor)]'>Title</span>
          <button className='cursor-pointer'
                  title='Edit title'
                  onClick={()=>descriptionClick('title')}
                >
                  <FaEdit className='hover:text-[var(--flat)] text-[var(--iconColor)]
                  h-4 w-4'/>
            </button>
        </div>
        <div className='relative flex gap-16 w-full'>
          {isEditing === 'title' ? (
            <div className='grid gap-4 w-full'>
              <input
              value={post.title}
              className="font-bold border-2 p-2 px-4 rounded-lg
              border-[var(--inputBorder)] w-full"
              autoFocus
              name='title'
              onChange={handleChnage}
              />
              <div className='flex gap-4'>
                <button className='saveButton cursor-pointer bg-green-500 text-white'
                onClick={()=>setModal(true)}>Save</button>
                <button className='saveButton cursor-pointer bg-gray-500/60 text-white'
                onClick={onHandleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <span className="text-lg font-bold">{post.title}</span>
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className='relative grid gap-4 w-full border-1 rounded-lg p-4 border-gray-300'>
        <div className='relative flex justify-between w-full'>
          <span className='text-[var(--textColor)]'>Description</span>
          <button className='cursor-pointer'
                  title='Edit description'
                  onClick={()=>descriptionClick('description')}
                >
                  <FaEdit className='hover:text-[var(--flat)] text-[var(--iconColor)]
                  h-4 w-4'/>
            </button>
        </div>
        <div>
        {isEditing === 'description' ? (
          <div className='grid gap-4 w-full'>
            <input
            value={post.description}
            className="border-2 p-2 px-4 rounded-lg
            border-[var(--inputBorder)] w-full"
            autoFocus
            name='description'
            onChange={handleChnage}
            />
            <div className='flex gap-4'>
              <button className='saveButton cursor-pointer bg-green-500 text-white'
              onClick={()=>setModal(true)}>Save</button>
              <button className='saveButton cursor-pointer bg-gray-500/60 text-white'
              onClick={onHandleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p>{post.description}</p>
          </>
        )}
        </div>
      </div>
      <div className='relative grid gap-8 w-full border-1 rounded-lg p-4 border-gray-300'>
        <div className='relative flex justify-between w-full'>
          <div className='flex gap-4 items-center'>
            <span className='text-[var(--textColor)]'>Image</span>
            <FaQuestionCircle className='h-4 w-4' title='Sometime, Reload to see changes.'/>
          </div>
          <button
              className='cursor-pointer'
              title='Edit title'
              onClick={()=>descriptionClick('imageURL')}
              >
              <FaEdit className='hover:text-[var(--flat)] text-[var(--iconColor)]
              h-4 w-4'/>
          </button>
        </div>

        {isEditing === 'imageURL' ? (
          <div className='grid gap-4 w-full'>
            <input
            value={post.imageURL}
            className="border-2 p-2 px-4 rounded-lg
            border-[var(--inputBorder)] w-full"
            autoFocus
            name='imageURL'
            onChange={handleChnage}
            />
            <div className='flex gap-4'>
              <button className='saveButton cursor-pointer bg-green-500 text-white'
              onClick={()=>setModal(true)}>Save</button>
              <button className='saveButton cursor-pointer bg-gray-500/60 text-white'
              onClick={onHandleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <img src={blog.imageURL} alt={blog.title} className="my-4 rounded-lg w-full object-cover" />
          </>
        )}
      </div>

      <div className='relative grid gap-8 w-full border-1 rounded-lg p-4 border-gray-300'>
        <div className='relative flex justify-between w-full'>
          <span className='text-[var(--textColor)]'>Image</span>
          <button
              className='cursor-pointer'
              title='Edit title'
              onClick={()=>descriptionClick('content')}
            >
              <FaEdit className='hover:text-[var(--flat)] text-[var(--iconColor)]
              h-4 w-4'/>
            </button>
        </div>
        {isEditing === 'content' ? (
          <div className='grid gap-4 w-full'>
            <textarea
            rows={24}
            value={post.content}
            className="border-2 p-2 px-4 rounded-lg
            border-[var(--inputBorder)] w-full"
            autoFocus
            name='content'
            onChange={handleChnage}
            />
            <div className='flex gap-4'>
              <button className='saveButton cursor-pointer bg-green-500 text-white'
              onClick={()=>setModal(true)}>Save</button>
              <button className='saveButton cursor-pointer bg-gray-500/60 text-white'
              onClick={onHandleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <article dangerouslySetInnerHTML={{ __html: contentHtml }}/>  
          </>
        )}
      </div>
      
      <div>
        <button className='saveButton flex gap-2 cursor-pointer bg-red-500/60 hover:bg-red-500 text-white'
              onClick={()=>setConfirmDelete(true)}>
        <MdDelete className='h-6 w-6'/>
          Delete
        </button>
      </div>
      </div>
        {confirmDelete && (
        <div className='h-screen w-8/10 fixed top-0 bg-black/20 backdrop-blur-2xl flex-center'>
            <div className="w-100 min-h-30 bg-[var(--background)] p-4 rounded-lg flex flex-col gap-2">
              <div className='pb-2'>
                <span className='font-bold text-lg'>Delete this post?</span>
              </div>
              <div className='text-[var(--textColor)] grid gap-2'>   
                <p>Deleting this will permanently remove all related data. This action is irreversible. Do you still want to continue?</p>
                <span className='font-bold'>This action cannot be undone.</span>
              </div>
              <div className='grid gap-2 py-2'>
                <input className='p-2 border-2 px-4 rounded-lg
            border-[var(--inputBorder)] w-full' type="text" placeholder='Type the post name for confirmation'
            onChange={(e)=>setDeleteProjectName(e.target.value)}/>
                <span className='text-sm font-light bg-[var(--textColor)] w-fit text-white py-1 px-4 rounded-sm'>{blog.title}</span>
              </div>
              <button className='cursor-pointer hover:bg-red-500 p-2 rounded-lg hover:text-white' onClick={deletePost}>Yes, delete</button>
              <button className='cursor-pointer bg-gray-500 p-2 rounded-lg text-white' onClick={() =>setConfirmDelete(false)}>Cancel</button>
            </div>
        </div>
        )}
    </div>
  );
}
