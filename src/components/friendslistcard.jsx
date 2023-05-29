import React , { useContext  } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";

const Friendslistcard =  ( props ) => {
   
        const {friend} =props;
        console.log("props",props)
        const navigate = useNavigate();
        const { addRemoveFriend, getFriends } = useContext(AuthContext);
        const user = useSelector((state) => state.user);

        const friendhandler = async () => {
            await addRemoveFriend(user._id,friend._id);
            await getFriends(user._id); 
        }

        return (
        
        <div className='flex py-2 px-1' 
            >
            <div className='cursor-pointer' onClick={() => {
            navigate(`/profile/${friend._id}`);
          }}>
                <img src={`http://localhost:5000/assets/${friend.picturePath}`} className='rounded-full object-cover h-10 w-10' alt='user' />
            </div>
            <div className='w-48 pl-4 pr-1 cursor-pointer' onClick={() => {
            navigate(`/profile/${friend._id}`);
          }}>
                <div className='font-bold text-sm'>{`${friend.firstName} ${friend.lastName}`}</div>
                <div className='text-muted text-gray-500 text-xs'>{friend.occupation}</div>
            </div>
            <div className='ml-3' onClick={friendhandler}>
                <span class="material-symbols-outlined text-blue-600 text-sm bg-blue-300 h-7 w-7 flex items-center justify-center rounded-full hover:bg-blue-200 cursor-pointer">
                    group_add
                </span>
            </div>
        </div>
  )
}

export default Friendslistcard;