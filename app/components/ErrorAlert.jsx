import React from 'react'
import {IoIosCloseCircle} from "react-icons/io";

export default function ErrorAlert({error, setError}) {
  return (
    <>
    {error &&
        <div className="absolute top-5 bg-[var(--background)] border borderColor p-2 rounded-lg">
            <div className="flex-center gap-2">
                <p className="text-red-400">{error}</p>
                <IoIosCloseCircle onClick={()=>setError('')} className="cursor-pointer"/>
            </div>
        </div>
    }
    </>
  )
}
