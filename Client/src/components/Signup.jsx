import React, { useRef } from 'react'
import BG from "../assets/images/bg.png"
import { useState, useEffect } from 'react'
import {set, useForm} from "react-hook-form"
import ReactFlagsSelect from "react-flags-select";
import {countryCodes} from "../components/countrycodes/codes.js"
const Signup = () => {
  const[width, setWidth] = useState(window.innerWidth)
  const [selected, SetSelected] = useState("")
  const [nameClick, setNameClick] = useState(null)
  const [username, setUserName] = useState("")
  const options = [
    "3 - 30 xaraf Kubilow xaraf wayn",
    "(A-Z , a-z)",
     "0- 9",
    "@ # $ % waa mamnuuc"

  ]
   const colors ={
    0:"text-red-500",
    1: "text-red-500",
    2:"text-red-500",
    3:"text-red-500"
  }
  const [optioncheck ,setOptionChek] = useState(colors)
 

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    resetField
  } = useForm()
  const onSubmit = async(data) => {
    const sendData = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers:{'Content-Type': "application/json"},
      body: JSON.stringify({email: data.email, password:data.password, number: data.number, name:data.username})
    })
    if(!sendData.ok){
      console.log('Failed to register')
    }
    const dataRes = await sendData.json()
    console.log(dataRes)
    reset()
    SetSelected("")
  }
  useEffect(() => {
    function getWidth (){
      const w = window.innerWidth
      console.log(w)
      setWidth(w)
    }
    
    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  },[])

  useEffect(() => {
    if (nameClick === null) return
    let color = {
      0 :
      username.length >= 3 && username.length <= 30 && /^[A-Z]/.test(username)
      ?
      "text-green-500" :
      "text-red-500"
    ,
    1: 
      /[A-za-z]/.test(username)?
      "text-green-500" :
      "text-red-500"
    ,
    2: 
    /[0-9]/.test(username)?
    "text-green-500" :
    "text-red-500"
    ,

    3:/^[A-Za-z0-9]+$/.test(username)?
    "text-green-500" :
    "text-red-500"
  }
  setOptionChek(color)
  const obj = Object.values(color).every((e, inx) => e === "text-green-500")
  if(obj){
    setNameClick(false)
  }else{
    setNameClick(true)
  }
 
  },[username])

 useEffect(() => {
  if(!selected.length >0) return
  resetField("number")
 }, [selected])
  return (
    <div className='w-full bg-[#c3c3c4]  min-h-screen'>
      <div  className={`flex  mx-auto`}>
        <div className={`w-full animate-fade-in  ${width <= 1100? "fixed flex-col" : ""} flex justify-start min-h-150 bg-none lg:rounded-r-4xl sm:rounded-b-4xl `}>
          <img src={BG} className={` w-full z-99 ${width <= 1100 ? "object-fit opacity-90": "object-cover max-w-[90%] z-9999"} transition-all duration-300 ease-in-out  h-full min-h-dvh shadow-xl/30 rounded-4xl  border-5  border-zinc-500 alt="backgound_img `} />
        </div>
       

        <div className={` w-full mx-auto animate-fade-in-up ${width <= 1100? "fixed flex-col text-white font-bold " : "text-zinc-100 flex-col"}  flex min-h-screen gap-5 justify-center items-center  p-3 rounded-l-4xl overflow-x-auto shadowxl/30 max-w-300 `}>
        <h1 className=' p-3 text-4xl font-bold  tracking-wider italic bg-zinc-700 rounded-r-2xl rounded-bl-2xl border-2 border-zinc-200 [text-shadow:3px_3px_6px_rgba(0,0,0,0.8),-2px_-2px_5px_rgba(255,255,255,0.08)]  '>Halkan Xogtaada Geli</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='h-auto overflow-y-auto inset-shadow-2xs inset-shadow-olive-700 flex flex-col items-start bg-white/10 backdrop-blur-2xl border border-slate-500  rounded-2xl w-full max-w-150 gap-2 p-4'>
        <input value={username}  type="text" {...register('username',
        
          {
            required: "magau waa wajib",
            pattern:{
              value: /^[a-zA-z0-9_]{3,20}$/,
              message: "Username-ku waa inuu ahaadaa 3-20 xaraf, numbers ama _"
            }

          }
        )}
        onClick={() => setNameClick(true)}
        onChange={(e) => {
          let value = e.target.value
          setUserName(value)
        }}
        placeholder="Geli magaca" className={`bg-zinc-700 ${errors.username? "border-red-500": "border-slate-300"} w-full border  shadow-xl/30 text-slate-50 outline-0 rounded-2xl p-2 text-whiet placeholder-slate-300`}/>
        {nameClick  &&(
          <div className=' flex flex-col  w-full  bg-zinc-300 border border-zinc-600 rounded-2xl -w-80'>
            { options.map((o, inx) => (
              <ul key={inx} className='w-full  p-1 list-disc indent-5'>
                 <li  className={`text-sm  ${optioncheck[inx]}`}>{o}</li>
              </ul>
          ))}
          
            </div>
         
        )}
        {errors.username && (
          <p className=' text-sm text-white shadow-xl/30 italic font-bold tracking-widest bg-red-600 p-1  opacity-65'>{errors.username.message}</p>
        )}
        <input
        onClick={()=> setNameClick(false)}
          type="email" {...register(
          'email',{
          required: "Emaiku waa waajib",
           pattern: {
          value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message:"Gali Emailsax ah"
        }
          }

         )}
         onChange={(e) => {}} 
         placeholder="Geli Email" className={`${errors.email? "border-red-500": "border-slate-300"} bg-zinc-700 w-full border shadow-xl/30 text-slate-50 outline-0 rounded-2xl p-2 text-whiet placeholder-slate-300`}/>
        {errors.email && (
          <p className=' text-sm text-white bg-red-600 p-1  opacity-65 shadow-xl/30 italic font-bold tracking-widest'>{errors.email.message}</p>
        )}
        <input  
         onClick={()=> setNameClick(false)}
         type="password"  {...register('password',
          {
            required: "password ku waa wajib",
            maxLength: 30,
            message: "Geli password sax ah"
          }
        )} placeholder="Geli Password" className={`${errors.password? "border-red-500": "border-slate-300"} bg-zinc-700 w-full border  shadow-xl/30 outline-0 text-slate-50  rounded-2xl p-2 text-whiet placeholder-slate-300`}/>
         {errors.password && (
          <p className=' text-sm text-white bg-red-600 p-1  opacity-65 shadow-xl/30 italic font-bold tracking-widest '>{errors.password.message}</p>
        )}
        
        <div 
        onClick={()=> setNameClick(false)}
        className={`flex gap-1 w-full ${width <= 370? "flex-col": "flex-row"} min-w-55`}>
          <ReactFlagsSelect
          
          className={` z-9999   bg-slate-900 text-zinc-700 [%_button]:text-amber-900 w-full rounded-2xl`}
          placeholder="dooro"
          selected={selected}
          selectedSize={width <= 1100? 12: 15}
          optionsSize={width >= 1100 ? 13: 10}
          onSelect={(code) => SetSelected(code)}
          />
          <div className='flex gap-3   bg-zinc-700 w-full border border-slate-300 shadow-xl/30 outline-0 text-slate-50  rounded-2xl p-2'>
          <span className='text-white font-bold underline p-2'>{countryCodes[selected]}</span>
          <input  type="number" {...register('number')} placeholder="Geli numbarka" className={` outline-0 text-whiet placeholder-slate-300 ${selected.length > 0 ?  "block": "hidden"} w-full max-w-60  text-zinc-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}/>
          </div>
        </div>
        <button type='submit' className='bg-zinc-900 w-full min-w-[30%] p-2 rounded-2xl border border-slate-200 shadow-xl/30  text-slate-50 font-bold text-xl'>Submit</button>
      </form>
        </div>
        
      </div>
      
    </div>
  )
}

export default Signup
