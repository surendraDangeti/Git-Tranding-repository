import {useState, useEffect} from 'react'
import Login from "./Pages/LoginPage/Login"
import Dashboard from "./Pages/Dashboard"
import './App.css'
import { createBrowserRouter, RouterProvider, Routes, Route, Navigate, Link,BrowserRouter } from "react-router-dom";
import {verifyData} from '../src/Pages/Components/verifyData.js'
import { createClient } from '@supabase/supabase-js'
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/Bs";
import {useSelector, useDispatch} from 'react-redux'
import { themeHandler } from './Redux/action';

const App = ()=>{
  const supabase = createClient("https://jfhnehczdafyrifmdfkf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaG5laGN6ZGFmeXJpZm1kZmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3Nzc3OTEsImV4cCI6MjAwMzM1Mzc5MX0.FraaYIhxhMElfwLtoBVuN3WLCEZofijKxU3WL9UFpP8");
  const [isProtected, setIsProtected] = useState(false);
  const [userData, setUserData] = useState("")

 //switch
 const dispatch = useDispatch();
 const {currentTheme} = useSelector((state) => state.data);

 function storeThemeData (value){
  localStorage.setItem("themeData", value)
}

  const toggleModal = () => {
    storeThemeData( currentTheme ? false: true)
    currentTheme ? dispatch(themeHandler(false)): dispatch(themeHandler(true));
    
  };
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme ? "#292c35" : "#fff";

  }, [currentTheme]);

//



useEffect(() => {
if(verifyData(localStorage.getItem("session"))){
  let tempOauth = localStorage.getItem("session")
  setUserData(JSON.parse(localStorage.getItem("session")))
  setIsProtected(true)

}
else{
  setIsProtected(false)
}

}, [verifyData(localStorage.getItem("session"))]);


async function signout() {
  const { error } = await supabase.auth.signOut()
  localStorage.removeItem("session")
  window.location.replace("/")
}

 const NavBar=()=>{
  return(
    <div className=" mr-3 mb-3">
      <div className="tranding-navbar">
          <div className="navbar-profile-section"><img src={userData?.user?.user_metadata?.avatar_url} className="avatar" /> <div>{`${userData?.user?.user_metadata?.name}`}</div></div>
          <div id="darkmode">
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          onChange={toggleModal}
          checked={currentTheme}
        />
        <label htmlFor="checkbox" className="label">
          <BsMoonStarsFill color="white" />
          <BsFillSunFill color="yellow" />
          <div className="ball"></div>
        </label>
      </div>

          <div>

            <a type="button" className="btn btn-sm" onClick={()=>signout()} >Logout</a></div>
      </div>
    </div>
  )
 }

const NotFoundPage = ()=>{
  return(
    <div className="text-white">Page Not Found</div>
  )
}


function Home (){
  return <>{isProtected ? <Navigate to="/dashboard" replace/> :<Login/>}</>

}


  return(
    <div>
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/dashboard" element={<><NavBar/><Dashboard/> </>}></Route>
         <Route path="*" element={<NotFoundPage  />}></Route>
      </Routes>
       </BrowserRouter>
      </div>
  )
}

export default App
