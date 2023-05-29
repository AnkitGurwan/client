import React from 'react'
import { useSelector } from "react-redux";


const Ownercard = () => {
    const user = useSelector(state => state.user);
    console.log(user.picturePath)

    return (
        <div className='bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-2'>
            <div className='h-24 flex py-2 items-center'>
                <div className=''>
                    <img src={`http://localhost:5000/assets/${user.picturePath}`} className='rounded-full object-cover h-12 w-12' alt='user' />
                </div>
                <div className='w-52 pl-4 pr-1'>
                    <div className='font-bold text-md'>{`${user.firstName} ${user.lastName}`}</div>
                    <div className='text-muted text-gray-500 text-xs'>0 followers</div>
                </div>
                <div>
                    <div><span class="material-symbols-outlined text-blue-500 cursor-pointer">
                        group_add
                        </span>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='h-20 p-4 flex flex-col'>
                <div className='flex items-center h-1/2'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-400">pin_drop</span></div>
                    <div className='text-sm text-gray-400 px-2 mb-1'>{user.location}</div>
                </div>
                <div className='flex items-center h-1/2 my-1'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-400">work</span></div>
                    <div className='text-sm text-gray-400 px-2 mb-1'>{user.occupation}</div>
                </div>
            </div>
            <hr/>
            <div className='h-24 py-6 px-3'>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-400'>Who's viewed your profile.</div>
                    <div className='text-gray-500'>{user.viewedProfile}</div>
                </div>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-400'>Impressions of your post</div>
                    <div className='text-gray-500'>{user.impressions}</div>
                </div>
            </div>
        </div>
  )
}

export default Ownercard