"use client"
import NewsComplete from '@/app/_models/NewsComplete'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function NewsCard({news} : {news: NewsComplete}) {

    const router = useRouter()

    function goToNewsPage() {
        router.push("/news/" + news.id)
    }

  return (
    <div onClick={goToNewsPage}

        className='bg-slate-200 border-2 rounded-lg p-3  text-primary mt-4 news-body hover:border-secondary/[0.4]'>
        <h2 className='text-primary text-xl font-semibold'>{news.title}</h2>
        <hr className="h-[2px] my-4 bg-slate-50 border-0"></hr>
        <div className=''>
            <p style={{lineHeight: "1"}}>
            {news.body.length < 350 ? news.body : news.body.slice(0, 350).concat("...  Click to read all.")}
            </p>
        </div>
        <div className='flex justify-end w-full'>
          <p className='text-sm italic'>{news.creationDate.toLocaleDateString()} <span className='text-md'> {news.author}</span></p>
        </div>
    </div>
  )
}
