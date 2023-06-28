import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { BsGithub } from 'react-icons/Bs';
import { verifyData } from '../Components/verifyData';
import './Login.css'

const supabase = createClient("https://jfhnehczdafyrifmdfkf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaG5laGN6ZGFmeXJpZm1kZmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3Nzc3OTEsImV4cCI6MjAwMzM1Mzc5MX0.FraaYIhxhMElfwLtoBVuN3WLCEZofijKxU3WL9UFpP8");

export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session) 
      if( verifyData(session)){ 
      localStorage.setItem("session",JSON.stringify(session))
     if(verifyData(session)){
      window.location.replace("/dashboard");
     }
    }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])


// this function handles the signIn functionality
  async function signIN() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  

    return (
      <div className="page-content">
      <div className="login-container">
      <div className="text-white login-page-heading">Trending repositories</div>
        <div className="login-section">
          <div>
       {!session  ? <button type="button" className ="btn btn-secondary btn-lg login-button" onClick={()=>  signIN()}> Login with Github <i>{<BsGithub/>}</i></button>: "" }
       </div>
       </div>
      </div>
      </div>
    )
  }
