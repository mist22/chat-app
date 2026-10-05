import React, { useState } from 'react'
import { MessageCircle, Mic, Plus, Send, X} from 'lucide-react'
import Baar from './Baar'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import emailjs  from "@emailjs/browser"
const Home = () => {
    const [addProfile, setAddProfile] = useState(false)
    const [email, setEmail] = useState("")
    const [screeWidth, setScreenWidth] = useState(window.innerWidth)
    let navigate = useNavigate()
    const [messages, setMessages] = useState([
    {
    text: "Hello!",
    sender: "me"
    }
    ]);
    const [fariin, setFariin] =  useState("")
    const[send, setSend] = useState(false)
    useEffect(() => {
      function getScreenWidth(){
        const width = window.innerWidth
        console.log(width)
        setScreenWidth(width)
      }

      window.addEventListener("resize", getScreenWidth)

      return () => {
        window.removeEventListener("resize", getScreenWidth)
      }
    }, [])
      async function handle_email (e) {
          const invite = emailjs.send(
            "service_r91y4je",
            "template_v2guj8j",
            {
                name: "daadir",
                email: e,
                message: "Hello"
            }, 
            "WUd1VM7MyBrc8sb11"
            )

        if(!invite.ok){
          throw new Error("email sending failed")

        }else{
        setEmail("")
        }
        
      }
  useEffect(() => {
    console.log(messages)
  },[messages])
  return (
    <div className='bg-zinc-800 min-h-screen flex justify-start items-start w-full gap-5'>
      <aside className='flex flex-1 relative bg-zinc-900 flex-col gap-8 border border-l-0 border-t-0 border-b-0 border-zinc-400 min-h-screen w-80 p-2 rounded-2xl'>
        <div className='flex items-center gap-2 font-bold italic p-1 mt-5'>
            <MessageCircle size={25} className='text-zinc-200 font-bold'/>
            <h1 className='text-2xl text-zinc-200 '>Haddal</h1>
        </div>
        <Baar/>
        <div className='h-px bg-zinc-100'></div>
        <h1 className=' text-zinc-300 tracking-widest text-shadow-2xs text-shadow-white font-bold text-2xl'>Sheekaysi</h1>
        <div className='mt-auto relative'>
            <Plus size={25} className='absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-12 text-zinc-100'/>
           <button 
           onClick={() => setAddProfile(true)}
            className='bg-zinc-800 border cursor-pointer border-zinc-300 rounded-2xl text-zinc-100 w-full p-3'>Sheeko Cususb</button>
        </div>
        <button onClick={() => navigate("/Signup")} className='bg-zinc-800 border cursor-pointer border-zinc-300 rounded-2xl text-zinc-100 w-full p-3'>SingUp</button>

      </aside>
      {screeWidth >= 800 && (
         <section className=' relative flex flex-col bg-radial-[at_50%_25%] from-zinc-700 to-zinc-900 to-75% w-[70%] h-screen rounded-2xl border border-zinc-500 p-4 '>
      
        <div className='w-full bg-zinc-700/50 border border-zinc-500 h-25 flex items-center gap-5 rounded-2xl p-2'>
        <div className='h-20 w-20 rounded-full bg-zinc-500'>
        </div>
        <div className='flex flex-col'>
            <h1 className='tracking-wide text-xl text-zinc-200'>Magaca</h1>
            <p className='tracking-wide  text-zinc-200 italic'>status</p>
        </div>
        
        </div>
        <div className='flex-1 overflow-y-auto p-5'>
          {messages.length && (
          <div className='flex flex-col items-end overflow-auto p-4 mt-5'>
            {...messages.map((ms, inx) => (
              <h1 key={inx} className=' bg-zinc-400 p-1 rounded-r-2xl m-1 rounded-bl-2xl  text-xl font-light italic text-white'>{ms.text}</h1>
            ))}
        </div>
      )}
        </div>
         
        <div className='mt-auto relative flex justify-between items-center w-full shrink-0'>
        <div className='w-full border border-zinc-700 h-20 rounded-2xl flex justify-center items-center'>
        <button><Mic  size={25} className='
        transition-transform
        hover:scale-103 duration-150 ease-in-out cursor-pointer
        absolute  text-amber-400 left-0 top-1/2 -translate-y-1/2 translate-x-1/2'/></button>
        
        <textarea
        style={{resize: "none"}}
        rows={5}
        cols={50}
        value={fariin}
        onChange={(e) => setFariin(e.target.value)} 
        type="text" placeholder="Halkan ku Qor" className='  p-4  mr-40 w-full max-w-380  h-20  outline-0   indent-12 text-zinc-100   rounded-2xl placeholder-zinc-300 '>
        </textarea>
        </div>
        <button 
        onClick={() => {setMessages(prev => [
          ...prev,
          {
          text: fariin,
          sender: "Me"
          }
        ]), setFariin("")}}
        className='
        transition-transform
        hover:scale-103 duration-150 ease-in-out
        absolute flex justify-start items-center gap-2 text-white font-bold right-0 bg-amber-700 p-3 top-1/2 -translate-y-1/2 -translate-x-1 w-40 rounded-2xl border cursor-pointer border-amber-50'>
        <Send/>
        Dir-Fariin
        </button>
        </div>
      </section>
      )}
    {addProfile && (
            <div className=' animate-fade-in  bg-radial-[at_50%_25%] from-zinc-700 from-10% to-zinc-800 to-60% border rounded-2xl border-zinc-200 w-150 h-80  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-100'>
                <button onClick={() => [setAddProfile(!addProfile), setEmail("")]}><X className='absolute right-2 top-3 text-zinc-300 font-bold transition-transform duration-150 ease-in-out  hover:scale-110 cursor-pointer'/></button>
                <h1 className={`${screeWidth <= 1100? "text-xl" : "text-[20px]"} text-zinc-200 font-bold text-3xl absolute top-15 translate-x-15`}>Halkan email invite ka gali</h1>
                <div className='absolute top-1/2  -translate-y-1/2 p-2  w-full gap-2'>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text" placeholder='Gali email' className='border outline-0 text-white font-bold border-zinc-100 placeholder-zinc-300 bg-white/10 backdrop-blur-2xl p-2 rounded-2xl w-full'/>
                <button
                onClick={async() => handle_email(email)}
                 className='text-white font-bold italic p-2 w-30 absolute top-1/2 right-2 text-xl tracking-wider rounded-2xl translate-y-10 bg-slate-900 shadow-xl/30 border border-zinc-300'>Send</button>
                </div>
            </div>
        )}
    {screeWidth  >=  1500 &&(
     <section className='w-[15%] bg-zinc-900 min-h-screen border border-zinc-400 p-4 rounded-2xl'></section>
    )}
    </div>
  )
}

export default Home
