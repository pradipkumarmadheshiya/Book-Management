import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Otp from "./pages/Otp"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/password/forgot' element={<Otp/>}/>
        <Route path='/otp-verificaton/:email' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
      </Routes>

      <ToastContainer theme="dark"/>
    </Router>
  )
}

export default App