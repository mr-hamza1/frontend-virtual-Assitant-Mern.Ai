import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userNotExist } from "../redux/reducer/userReducer";
import { useState } from "react";

const Home = () => {

    const {user} = useSelector((state)=> state.userReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isLoading , setIsLoading] = useState(false);

    const logOut = async() =>{

       let toastId = toast.loading("logOut...")
                setIsLoading(true)

        try {
          const {data} = await axios.get(`http://localhost:3000/api/v1/user/logout`, { withCredentials: true })
           
           dispatch(userNotExist());
             toast.success(data?.message,{
              id: toastId
             })

        } catch (error) {
          toast.dismiss(toastId); 
          setErr(error?.response?.data?.message || "Something went Wrong") 
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black 
    to-[#030353] flex justify-center items-center flex-col gap-[20px]">

      <button className='min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px] absolute 
       text-black font-semibold top-[20px] right-[20px] cursor-pointer px-[20px] py-[10px]' onClick={()=> navigate(`/customize`)} >
         Custmize your Assistant
         </button>
      <button className='min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px] absolute
       text-black font-semibold top-[100px] right-[20px] cursor-pointer' onClick={()=> logOut()} disabled={isLoading} >
         logout
         </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">

        <img src={user.assistantImage} alt="virtual Assitant" className="h-full object-cover" />

      </div>

        <h1 className="text-white text-[18px]  font-semibold">I'm {user.assistantName}</h1>


    </div>
  )
}

export default Home