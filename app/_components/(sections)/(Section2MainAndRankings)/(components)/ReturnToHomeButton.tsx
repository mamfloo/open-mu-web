"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ReturnToHomeButton() {
    const router = useRouter();

    function onClickAction(){
        router.push("/")
    }

  return (
    <button onClick={onClickAction} className='mt-4 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-2 px-3 rounded-lg mx-auto shadow-xl text-xl text-primary'>Return back</button>
  )
}
