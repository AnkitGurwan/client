import React , { useState , useContext , useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
      const { createPost , getPosts } = useContext(AuthContext);
      const user = useSelector(state => state.user);
      const [formValue, setFormValue] = useState();
      const [postAdded,setPostAdded] = useState(false);
      const [showImage, setShowImage] = useState(false);
      const [post, setPost] = useState({
        description: "",
        picturePath: "",
      });

      const getItem=async ()=>{        
        await getPosts(); 
    };

    useEffect(()=>{
        getItem();
    },[postAdded])
          

      const onChangeHandler = async (event) => {
        setPost({...post,[event.target.name] : event.target.value});
    }

      const imageHandler = async (event) => {
        setFormValue(event.target.files[0]);
        post.picturePath=event.target.files[0].name;
      }

      const formdata = new FormData();
      formdata.append('description',post.description);
      formdata.append('picturePath',post.picturePath);
      formdata.append('userId',user._id);
      formdata.append('picture',formValue);

      const submitHandler = async (event) => {
        event.preventDefault();
        const x = await createPost(formdata)
    
        if(x === 201){
          toast.success('Post Added', {
          position: toast.POSITION.TOP_CENTER
        });
        post.description="";
        setFormValue(null);
        setPostAdded(true);
        setShowImage(false);
        }
        
        else {
            toast.error('Could not Post. Please try again later.', {
            position: toast.POSITION.TOP_CENTER
          });
        }
    }

      return (
        <div className='pb-3'>
          <form onSubmit={submitHandler} className='bg-white rounded-lg p-1'>
              <div className='flex p-4'>
                <img src={`http://localhost:5000/assets/${user.picturePath}`} className='h-12 w-12 rounded-full mr-2 object-cover' alt='' />
                <input type='text' className='mx-1 w-full rounded-full my-auto h-9 bg-gray-200 text-xs pl-4 text-start focus:outline-none border-2 focus:border-blue-300' name='description' id='description' required value={post.description} onChange={onChangeHandler} placeholder='What is in your mind ...'/>
              </div>
              <hr/>
              {showImage?<div className='p-4 bg-gray-100'>
                <input className='' type='file' id='picture' name='picture' required onChange={imageHandler}/>
              </div>:""}
              <hr/>
              <div className='py-3 px-1 md:px-4 flex justify-between items-center'>
                    <div className=' text-xs md:text-sm flex items-center cursor-pointer' onClick={()=>setShowImage(true)}><span class="material-symbols-outlined px-1 text-xs lg:text-lg">image</span>
                        <span>Image</span>
                    </div>
                    <div className='text-xs md:text-sm flex items-center'><span class="material-symbols-outlined px-1 text-xs lg:text-lg">Attachment</span>
                        <span>Attachment</span>
                    </div>
                    <div className='text-xs md:text-sm flex items-center'><span class="material-symbols-outlined px-1 text-xs lg:text-lg">mic</span>
                        <span>Audio</span>
                    </div>
                    <button type='submit'  className='bg-blue-400 hover:bg-blue-500 text-gray-700  px-2 md:px-3 py-1 rounded-full text-xs lg:text-sm'>Post</button>
              </div>
          </form>
        </div>
  )
}

export default AddPost;