import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAssitantName, userExist, userNotExist } from '../redux/reducer/userReducer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";


const CustomizeName = () => {

     const {assitantNameHome, backendImage, selectedImage} = useSelector((state)=> state.userReducer);
  
    const dispatch = useDispatch();
    
    const navigate = useNavigate()

      let [isLoading, setIsLoading] = useState(false)


    const [assitantName , setAssitantName] = useState( assitantNameHome || "")

    const refetchUser = () => {
  axios
    .get("http://localhost:3000/api/v1/user/me", { withCredentials: true })
    .then(({ data }) => dispatch(userExist(data.user)))
    .catch(() => dispatch(userNotExist()));
};


const handleUpdateAssistant = async () => {
  let toastId = toast.loading("Logging in...");
  setIsLoading(true);

  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data", // for FormData
    },
  };

  const formData = new FormData();
  formData.append("assistantName", assitantName);
  
  if (backendImage) {
    console.log("Appending image file:", backendImage);
    formData.append("assistantImage", backendImage); // actual File or Blob
  } else {
    formData.append("imageUrl", selectedImage); // probably a URL or base64 string
  }

  try {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/user/updateAssistant`,
      formData,
      config
    );

    console.log(data);
    refetchUser();
    toast.success(data?.message, { id: toastId });

  } catch (error) {
    console.log(error || "Something went wrong");
    toast.error("Failed to update", { id: toastId });
  } finally {
    setIsLoading(false);
  }
};


   
    useEffect(()=>{
        dispatch(userAssitantName(assitantName))
    },[assitantName])

  return (
     <>
       
    <MdKeyboardBackspace className= 'absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]'
                     onClick={()=> navigate("/customize")}
                   />

    <div className="w-full h-[100vh] bg-gradient-to-t from-black 
       to-[#030353] flex justify-center items-center flex-col p-[20px]">

        <h1 className="text-white mb-[30px] text-[20px] sm:text-[24px] md:text-[30px]">
            Enter your <span className="text-blue-200">Virtual Assistant</span> Name
        </h1>

        <input type="text" placeholder='eg. Jarvis'
           className='w-full h-[60px] max-w-[700px] outline-none border-2 border-white text-white bg-transparent
           placeholder-gray-300  rounded-full px-[20px] py-[10px] text-[18px] ' 
           required onChange={(e)=> setAssitantName(e.target.value)}
           />

             {
            assitantName &&
           <button className='min-w-[300px] h-[60px] mt-[50px] rounded-full bg-white text-[19px]
                 text-black font-semibold cursor-pointer'
                 onClick={()=> {
                  navigate(`/`)
                  handleUpdateAssistant()
                }}
                 disabled={isLoading}
                 >
                Finally Create Your Assitant
            </button>
       }

          
          </div>
     </>
  )
}

export default CustomizeName