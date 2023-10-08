"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Slider from "../../../../public/img/slider-img-1.jpg"
import Slider2 from "../../../../public/img/slider-img-2.jpg"

export default function Banners() {
  const [imgArray, setImgArray] = useState([Slider, Slider2])
  const [currentImg, setCurrentImg] = useState(0)

  //change banner image after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if(imgArray.length === currentImg+1){
        setCurrentImg(0);
      } else {
        setCurrentImg(currentImg + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  })

  function onClick() {
    if(imgArray.length === currentImg+1){
      setCurrentImg(0);
    } else {
      setCurrentImg(currentImg + 1);
    }
  }

  return (
    <div className="w-[60%] h-[90%] bg-slate-400 relative">
      <Image className="w-full object-cover h-full bg-top"  src={imgArray[currentImg]} alt="slider 1 mu online"/>
      <button className="pt-1 px-3 absolute right-10 top-1/2 text-primary bg-secondary/[.9] rounded-full pb-1 px-2 inline-block font-extrabold border shadow-lg shadow-slate-500 hover:border-primary" onClick={onClick}> &#10132; </button>
    </div>
  )
}
