import Card from "../components/Card"
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userBackendImage, userFrontendImage, userSelectedImage } from "../redux/reducer/userReducer"
import { useNavigate } from "react-router-dom"
import { MdKeyboardBackspace } from "react-icons/md";



const Customize = () => {

  const images=[
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
  ]
  
  const dispatch = useDispatch();


  const inputImage = useRef()
  const [frontendImage, setFrontendImage] = useState("")
  const [backendImage, setBackendImage] = useState("")

  const handleImage = (e)=>{
    const file = e.target.files[0];
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setBackendImage(file);
  setFrontendImage(imageUrl);

  dispatch(userFrontendImage(imageUrl));
  dispatch(userBackendImage(file));

  }

  
  const {selectedImage, user} = useSelector((state)=> state.userReducer);
  
    const navigate = useNavigate()

 
  return (
  <>
      {
        user.assitantImage  &&
         <MdKeyboardBackspace className= 'absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]'
                 onClick={()=> navigate("/")}
               />
      }

    <div className="w-full h-[100vh] bg-gradient-to-t from-black 
       to-[#030353] flex justify-center items-center flex-col p-[20px]">


        <h1 className="text-white mb-[30px] text-[20px] sm:text-[24px] md:text-[30px]">
          Select your <span className="text-blue-200">Virtual Assitant</span> Image
          </h1>

       <div className="w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[20px]">
         {
              images.map((image, i)=> <Card image={image} key={i}/>)
        }

         <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#030326] border-2 border-[#0000ffde] rounded-2xl
          cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-blue-950 hover:border-[white]
           hover:border-4 flex justify-center items-center
            ${selectedImage === "input" && "shadow-2xl shadow-blue-950 border-[white] border-4" }
       `}
           onClick={()=> {
            inputImage.current.click()
            dispatch(userSelectedImage("input"))

          }}
           >
            {
              !frontendImage?
              <RiImageAddLine className="text-white w-[25px] h-[25px]" />
              :
                <img src={frontendImage} className='h-full object-cover' />

            }
         </div>
                     <input type="file" accept="image/*" ref={inputImage} hidden 
                     onChange={handleImage}
                      />

       </div>

       {
        selectedImage && 
           <button className='min-w-[150px] h-[60px] mt-[30px] rounded-full bg-white text-[19px]
                 text-black font-semibold cursor-pointer'
                 onClick={()=> navigate(`/customizeName`)}
                 >
                Next
            </button>
       }

  
    </div>
  </>
  )
}

export default Customize