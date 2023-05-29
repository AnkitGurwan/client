import React , {useContext , useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import AuthContext from 'context/AuthContext';
import Friend from './friendslistcard';


const Friendlist = () => {
      const friends = useSelector((state) => state.user.friends);
      const user = useSelector((state) => state.user);
      const length=user.friends.length;
      
      const { getFriends } = useContext(AuthContext);

      const getItem = async ()=>{        
        await getFriends(user._id); 
    };

    useEffect(()=>{
        getItem();
    },[]
    );
      return (
        <div className='mt-6 mx-10'>
          <div className='bg-white rounded-lg p-3'>
              <div className='font-bold text-lg p-2'>Friend's List :</div>
              <div className='p-2'>
              {length?friends.map((friend,i) => (
                <Friend
                  key={i}
                  friend={friend}
                />
              )):<div className='text-sm w-full h-12 bg-gray-100 flex justify-center items-center rounded'>No friends yet</div>
              }
              </div>
          </div>
        </div>
  )
}

export default Friendlist;