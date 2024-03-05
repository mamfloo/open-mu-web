import ReturnToHomeButton from '@/app/_components/(sections)/(Section2MainAndRankings)/(components)/ReturnToHomeButton';
import NewsComplete from '@/app/_models/NewsComplete'
import { prisma } from '@/lib/prisma'
import React from 'react'

export default async function page({params} : {params: {id: string}}) {

    console.log("path", params.id);
    const news: NewsComplete | null = await prisma.openMuWeb_News.findFirst({
        where: {
            id: params.id || ""
        }
    })


  return (
    <div className='flex flex-col gap-3 mx-auto w-full px-20'>
        <ReturnToHomeButton/>
        <div 
            className='bg-slate-200 border-2 rounded-lg p-3  text-primary mt-4'>
            <h2 className='text-primary text-xl font-semibold'>{news!.title}</h2>
            <hr className="h-[2px] my-4 bg-slate-50 border-0"></hr>
            <div className=''>
                <p style={{lineHeight: "1"}}>
                {news!.body}
                </p>
            </div>
            <div className='flex justify-end w-full'>
            <p className='text-sm italic'>{news!.creationDate.toLocaleDateString()} <span className='text-md'> {news!.author}</span></p>
            </div>
        </div>
    </div>
  )
}
