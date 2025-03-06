import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Team = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();



  return (
    <div className='min-h-screen bg-[#F4EFCA] flex items-center justify-center container mx-auto py-10'>
      
    </div>
  )
}

export default Team
