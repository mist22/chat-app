import React from 'react'
import { Search } from 'lucide-react'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react' 
const Baar = () => {
  const [input, setInput] = useState("")
 
  return (
    <div className='flex w-full relative'>
      <input 
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className='bg-zinc-700  border border-zinc-400 w-full p-2 rounded-2xl text-start indent-8 text-zinc-100'
      type="text" placeholder='Raadi Qof' />
      <Search className='absolute top-0 left-0 translate-y-1/2 translate-x-1/2 text-zinc-300'/>
     {input.length > 0 && 
     <button
     onClick={() => setInput("")} 
     >
      <X className='absolute top-0 right-5 translate-y-1/2 translate-x-1/2 text-zinc-300'/>
      </button>
      }
    </div>
  )
}

export default Baar
