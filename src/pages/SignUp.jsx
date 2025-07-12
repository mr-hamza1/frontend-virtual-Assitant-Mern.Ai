import { useState } from 'react';
import bg from '../assets/authBg.png'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { server } from '../constant/config';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { userExist } from '../redux/reducer/userReducer';




const SignUp = () => {
   
  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const [err, setErr] = useState("");
  

  let [isLoading, setIsLoading] = useState(false)

      const dispatch = useDispatch();



  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
        e.preventDefault();
      
        let toastId = toast.loading("logging In...")
         setIsLoading(true)

         const config = {
      withCredentials: true,
       headers: {
                "Content-Type": "application/json",
            },
    };

        try {
            const { data } = await axios.post(`http://localhost:3000/api/v1/user/signup`,
                {
                  name,
                  email,
                  password
                },
                config
            )
            console.log(data)
             dispatch(userExist(data.user));
             toast.success(data?.message,{
              id: toastId
             })
        } catch (error) {
          setErr(error?.response?.data?.message || "Something went Wrong") 
    } 
    finally{
            setIsLoading(false)
        }
    };


  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{
      backgroundImage: `url(${bg})`,
    }}>
      <form className='w-[90%] h-[600px] max-w-[500px] bg-[#00000083] backdrop-blur
        shadow-lg shadow-black flex flex-col items-center justify-center px-[20px] gap-[20px]'
        onSubmit={handleSignup}
        >
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>
          Register to <span className='text-blue-400'>Virtual Assitant</span>
          </h1>

          <input type="text" placeholder='Enter Your Name'
           className='w-full h-[60px] outline-none border-2 border-white text-white bg-transparent
           placeholder-gray-300  rounded-full px-[20px] py-[10px] text-[18px] ' 
           required onChange={(e)=> setName(e.target.value)}
           />

          <input type="text" placeholder='Email'
           className='w-full h-[60px] outline-none border-2 border-white text-white bg-transparent
           placeholder-gray-300  rounded-full px-[20px] py-[10px] text-[18px]'
           required onChange={(e)=> setEmail(e.target.value)}
           />

           <div className='w-full h-[60px] outline-none border-2 border-white bg-transparent rounded-full relative'>
             <input type={`${showPassword ? "text" : "password"}`} placeholder='Password'
               className='w-full h-full outline-none border-2 border-white text-white bg-transparent
               placeholder-gray-300  rounded-full px-[20px] py-[10px] text-[18px]'
               required onChange={(e)=> setPassword(e.target.value)}
                />  
              {
                !showPassword?        
              <IoEye className='text-white top-[18px] right-[22px] w-[20px] h-[20px] absolute'
               onClick={() => setShowPassword(true)}
                /> :
              <IoEyeOff  className='text-white top-[18px] right-[22px] w-[20px] h-[20px] absolute'
               onClick={() => setShowPassword(false)}
                />
              }
                </div>

                   {
                  err.length > 0 && <p className='text-red-500'>
                    *{err}
                  </p>
                }

                <button className='min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px]
                 text-black font-semibold'
                 disabled={isLoading}
                 >
                  { isLoading? "loading..." : "Sign Up"}
                  </button>

               <p className='text-white text-[18px] '>
                    Already have an account?{' '} 
                 <button
                  className={`text-blue-400 cursor-pointer bg-transparent border-none p-0 m-0  ${
                    isLoading ? 'pointer-events-none opacity-50' : ''
                  }`}
                  onClick={() => navigate('/signin')}
                  disabled={isLoading}
                >
                  Sign In
                </button>
                    </p>

        
      </form>

    </div>
  )
}

export default SignUp