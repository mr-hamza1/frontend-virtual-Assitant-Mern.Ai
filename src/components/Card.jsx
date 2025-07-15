import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userBackendImage, userFrontendImage, userSelectedImage } from '../redux/reducer/userReducer';

const Card = ({image}) => {

  const {selectedImage} = useSelector((state)=> state.userReducer);
  
    const dispatch = useDispatch();

    console.log(selectedImage)

  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ffde] rounded-2xl cursor-pointer
       overflow-hidden hover:shadow-2xl hover:shadow-blue-950 hover:border-[white] hover:border-4
       ${selectedImage === image && "shadow-2xl shadow-blue-950 border-[white] border-4" }
       `}
       onClick={()=> {
        dispatch(userSelectedImage(image))
        dispatch(userBackendImage(null))
        dispatch(userFrontendImage(null))
      } }
       >

        <img src={image} className='h-full object-cover' />

    </div>
  )
}

export default Card