import { lazy, Suspense, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { Routes, Route, BrowserRouter} from "react-router-dom"
import Loader from "./components/Loader"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import ProtectRoute from "./auth/ProtectRoute"
import Home from "./pages/Home";
import Customize from "./pages/customize";
import CustomizeName from "./pages/CustomizeName";

const SignUp = lazy(() => import('./pages/SignUp'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {

    const {user, loading} = useSelector((state) => state.userReducer)

    const dispatch = useDispatch();

useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", { withCredentials: true })
      .then(({ data }) => dispatch(userExist(data.user)))
      .catch(() => dispatch(userNotExist()));

}, [dispatch, user?.id]);

  return (
           loading? <Loader />:

<BrowserRouter>
       <Suspense fallback={<Loader/>}>
     <Routes>
    <Route
            path="/signup"
            element={
              <ProtectRoute user={!user} redirect="/customize">
                <SignUp />
              </ProtectRoute>
            }
          /> 
    <Route
            path="/signin"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          /> 
          <Route element={<ProtectRoute user={user} redirect='/signin'/>}>  
                   <Route  path="/" element={<Home/>}/>
                  <Route  path="/customize" element={<Customize/>}/>
                  <Route  path="/customizeName" element={<CustomizeName/>}/>
          </Route>


          
             </Routes>
    </Suspense>
     <Toaster position="bottom-center" />

</BrowserRouter>

    )
}

export default App