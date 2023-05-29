import React , {useContext ,useEffect , useState} from 'react'
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";

const Feeds = (
    {
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }
) => {
    const { addRemoveFriend, getFriends ,likePost ,getPosts} = useContext(AuthContext);
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const likeCount = Object.keys(likes).length;
    const [check,setCheck] = useState(true);
    const [liked,setLiked] = useState(false);

    const Calculate = ()=>{
    if(postUserId===user._id)setCheck(false);
    }
    
    useEffect(()=>{
        Calculate();
        Calculate2();
    },[]);

    const Calculate2 = ()=>{
        const thisPost=posts.filter((post)=>post._id===postId)
        const x=Object.keys(thisPost[0].likes);
        if(x)x.map((id)=>{if(id===user._id)setLiked(true);})
    }

    const friendhandler = async () => {
        await addRemoveFriend(user._id,postUserId);
        await getFriends(user._id); 
    }
    const likeHandler = async () => {
        await likePost(postId,user._id);
        await getPosts();
    }

  return (
    <div className='h-fit bg-white rounded-lg my-4'>
        <div className=' bg-white rounded-lg'>
            <div className='h-20 flex items-center px-4'>
                <div className=''>
                    <img src={`http://localhost:5000/assets/${userPicturePath}`} className='rounded-full object-cover h-10 w-10' alt='user' />
                </div>
                <div className='w-72 pl-4 pr-1'>
                    <div className='font-bold text-sm'>{name}</div>
                    <div className='text-muted text-gray-500 text-xs'>{location}</div>
                </div>
                <div className='ml-3' onClick={friendhandler}>
                    {check?
                    <span class="material-symbols-outlined text-blue-600 text-xl bg-white h-7 w-7 flex items-center justify-center rounded-full hover:bg-blue-200 cursor-pointer">
                        group_add
                    </span>:""
                 }
                </div>
            </div>
            <div className='h-3/4 px-4'>
                <div className='py-2 px-1 text-sm'>{description}</div>
                <img src={`http://localhost:5000/assets/${picturePath}`} className='rounded-lg object-cover' alt='userimage' />
            </div>
            <div className='px-4 py-2 flex items-center'>
                <div className='flex items-center p-2 text-sm cursor-pointer' onClick={likeHandler}>{liked?<span onClick={()=>setLiked(false)} class="material-symbols-outlined p-1 text-lg text-pink-600 ">favorite</span>
                :<span onClick={()=>setLiked(true)} class="material-symbols-outlined p-1 text-lg">favorite</span>
                }<span>{likeCount}</span>
                </div>
                <div className='flex items-center p-2 text-sm'><span class="material-symbols-outlined p-1 text-lg">chat_bubble</span><span>{comments.length}</span></div>
            </div>
        </div>
    </div>
  )
}

export default Feeds;