import React, { useState } from 'react'
import {useSelector} from "react-redux"
import {Navigate} from "react-router-dom"
import {GiHamburgerMenu} from "react-icons/gi"
import SideBar from "../layout/SideBar"

const Home = () => {

  const [isSideBarOpen, setIsSideBarOpen]=useState(false)
  const [selectedComponents, setSelectedComponents]=useState("")

  const {user, isAuthenticated}=useSelector(state=>state.auth)

  // if(!isAuthenticated){
  //   return <Navigate to={"/login"}/>
  // }
  
  return (
    <div className='relative md:pl-64 flex min-h-screen bg-gray-100'>
      <div className='md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md text-white h-9 w-9'>
        <GiHamburgerMenu className='text-2xl'
        onClick={()=>setIsSideBarOpen(!isSideBarOpen)}/>
      </div>
      <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} selectedComponents={selectedComponents} />
    </div>
  )
}

export default Home
