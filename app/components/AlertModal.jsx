import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";


export default function AlertModal({setConfirmModal, saveChanges}) {

  return (
    <div className='w-full h-full bg-black/20 backdrop-blur-xl flex items-center justify-center'>
      <div className='w-100 bg-[var(--secondaryBackground)] p-8 rounded-lg'>
        <div className='grid gap-4'>
            <div className='grid'>
                <span className='text-lg font-bold'>Confirm update?</span>
                <span className='text-justify text-[var(--textColor)]'>This action will update the stored data immediately. Make sure all fields are correct before proceeding</span>
            </div>
            <div className='grid md:flex md:gap-2 gap-4 w-full'>
                <button className='flex-center button text-black hover:text-white bg-gray-500 hover:bg-gray-600 w-full flex items-center gap-2'
                onClick={()=>setConfirmModal(false)}>
                    <RiArrowGoBackFill/>
                    No, go back</button>
                <button className='flex-center button text-white hover:text-white bg-green-500 hover:bg-green-600 w-full flex items-center gap-2'
                onClick={()=>saveChanges()}>
                    <FaSave/>
                    Save Changes</button>
            </div>
        </div>
      </div>
    </div>
  )
}
