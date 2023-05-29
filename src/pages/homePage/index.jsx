import React, { useEffect ,useContext, useState } from "react";
import Ownercard from "components/ownercard";
import Friendlist from "components/friendlist"
import Feeds from "components/feeds"
import Navbar from "components/navbar";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPost from "components/addpost";

const HomePage = () => {
    const Navigate = useNavigate();
    const { getPosts } = useContext(AuthContext);
    const user = useSelector((state) => state.user);

    
    
    const posts = useSelector((state) => state.posts);

    const getItem=async ()=>{        
        await getPosts(); 
    };

    useEffect(()=>{
        getItem();
        if(!localStorage.getItem('token')){
         
          Navigate("/login");
          (toast.error('Please login to access', {
            position: toast.POSITION.TOP_CENTER
        }))
        };
      },[])
    return (
        <div className="h-full">
            <Navbar/>
            <div className="h-fit grid grid-cols-3 absolute top-16 bg-gray-100">
                <div className="col-span-1 pt-6 ">
                    <div className="w-4/5 ml-12 ">
                        <Ownercard/>
                    </div> 
                </div>
                <div className="col-span-1 mt-6">
                    <AddPost/>
                    {posts.map(
                    (post,i) => (
                    <Feeds
                        key={i}
                        postId={post._id}
                        postUserId={post.userId}
                        name={`${post.firstName} ${post.lastName}`}
                        description={post.description}
                        location={post.location}
                        picturePath={post.picturePath}
                        userPicturePath={post.userPicturePath}
                        likes={post.likes}
                        comments={post.comments}
                    />
                    )
                )}
                </div>
                <div className="col-span-1  h-full ">
                    <Friendlist/>
                </div>
            </div>
        </div>
);
}

export default HomePage;