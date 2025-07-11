import { lazy } from "react"
import { Routes, Route} from "react-router-dom"

const SignUp = lazy(() => import('./pages/SignUp'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<Login/>} />
    </Routes>
    )
}

export default App