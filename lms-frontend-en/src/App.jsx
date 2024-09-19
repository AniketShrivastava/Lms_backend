import { useEffect, useState } from 'react'
import './App.css'
import toast from 'react-hot-toast'

function App() {
  

  useEffect(()=>{
    toast.success("hello")
  })

  return (
    <>
    <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
    </>
  )
}

export default App
