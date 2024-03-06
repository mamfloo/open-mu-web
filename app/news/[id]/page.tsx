import NewsCard from '@/app/_components/(sections)/(Section2MainAndRankings)/(components)/NewsCard';
import ReturnToHomeButton from '@/app/_components/(sections)/(Section2MainAndRankings)/(components)/ReturnToHomeButton';
import NewsComplete from '@/app/_models/NewsComplete'
import { prisma } from '@/lib/prisma'
import React from 'react'

export default async function page({params} : {params: {id: string}}) {
    //used to test the validity of regex
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;


    let news: NewsComplete | null = null;
    try {
        if(uuidRegex.test(params.id)){
            news = await prisma.openMuWeb_News.findFirst({
                where: {
                    id: params.id
                }
            })
        }
    } catch(e){
        console.log(e);
    }


  return (
    <div className='flex flex-col gap-3 mx-auto w-full px-20'>
        <ReturnToHomeButton/>
        {news ? <NewsCard news={news}/>
            : <div className='flex justify-center'>
                <p className='text-primary text-xl mt-10'>No News was found!</p>
              </div>}
    </div>
  )
}
