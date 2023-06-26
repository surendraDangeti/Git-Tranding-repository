import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { BsGithub } from 'react-icons/Bs';

const supabase = createClient("https://jfhnehczdafyrifmdfkf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaG5laGN6ZGFmeXJpZm1kZmtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3Nzc3OTEsImV4cCI6MjAwMzM1Mzc5MX0.FraaYIhxhMElfwLtoBVuN3WLCEZofijKxU3WL9UFpP8");

export default function Login() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])


  async function signIN() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  

  async function signout() {
    const { error } = await supabase.auth.signOut()
  }

  // console.log(session)

    return (
      <div className="my-5">
      <div className="d-flex justify-content-center">
       {!session  ? <button type="button" className ="btn btn-secondary btn-lg" onClick={()=>  signIN()}> Login with Github <i>{<BsGithub/>}</i></button>: <button className="btn btn-secondary btn-lg" onClick={()=>  signout()}>Logout</button> }
      </div>
      </div>
    )
  }
