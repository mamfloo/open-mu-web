"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

//if forward then go forward else go to prev page
export default function ChangePageButton({forward} : {forward: boolean}) {

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "0");
    const router = useRouter();

    function onClickAction(){
        if(forward){
            router.push("/?page="+ (page+1));
        } else {
            router.push("/?page="+ (page-1));
        }
    }

  return (
    <button onClick={onClickAction} className='mt-6 bg-secondary/[0.6] hover:bg-secondary/[0.9] p-1 rounded-lg px-2  mx-auto shadow-xl text-primary'>
        {forward? "Next page >" : "< Prev page"}
    </button>
  )
}
