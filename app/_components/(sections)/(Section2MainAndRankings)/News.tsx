import { News } from '@/app/_models/news';
import { prisma } from '@/lib/prisma'
import React from 'react'
import NewsCard from './(components)/NewsCard';
import NewsComplete from '@/app/_models/NewsComplete';
import ChangePageButton from './(components)/ChangePageButton';

export default async function News({page} : {page: number}) {

  page = page >= 0 ? page : 0;

  const NEWS_PER_PAGE = 4;
  const SKIP = (page * NEWS_PER_PAGE) || 0; 

  const news: NewsComplete[] = await prisma.openMuWeb_News.findMany({
    skip: SKIP,
    take: NEWS_PER_PAGE,
    orderBy: {
      creationDate: 'desc'
    }
  });

  return (
    <div className='px-20 w-full'>
      <h1 className='text-2xl text-primary font-semibold mb-4'>NEWS</h1>
      <hr className='h-[2px] bg-primary/[0.4] mb-6'/>
        {news.map((n, i) => (
          <NewsCard news={n} key={i} shortVersion={true}/>
        ))}
        <div className='flex'>
          {(page > 0) && <ChangePageButton forward={false}/>}
          {((!page || page >= 0) && news.length > 3) &&<ChangePageButton forward={true}/>}
        </div>
    </div>
  )
}
