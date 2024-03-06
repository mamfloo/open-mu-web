"use client"
import NewsComplete from '@/app/_models/NewsComplete'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'

export default function NewsCard({news, shortVersion} : {news: NewsComplete, shortVersion?: boolean}) {
    const [role, setRole] = useState<string | null>();
    const [showDialog, setShowDialog] = useState(false);

    function hideDialog(){
      setShowDialog(false);
    }

    const router = useRouter()
    function goToNewsPage() {
        router.push("/news/" + news.id)
    }

    useEffect(() => {
      setRole(localStorage.getItem("role"));
    },[])


    async function deleteNews(){
      const request = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/news/`+news.id, {
        method: "DELETE"
      });
      const result = await request.json();
      if(request.ok){
        toast.success(result.message);
        router.refresh();
      }else {
        toast.error(result.message);
      }
      hideDialog();
    }
    

  return (
    <div 
        className='bg-slate-200/[0.3] border-2 border-slate-200/[0.5] rounded-lg p-3  text-primary mt-4 hover:border-secondary/[0.4]'>
          {showDialog && <DeleteConfirmationDialog onConfirm={deleteNews} onCancel={hideDialog}/>}
          <div className='flex justify-between h-fit'>
            <div className='h-fit'>
              <h2 className='text-primary text-xl font-semibold'>{news.title}</h2>    
            </div>
            {role === "GAME_MASTER" && 
               <div className='h-fit '>
                <button className=' bg-red-100 hover:bg-red-200/[0.9] p-1 rounded-lg px-2  mx-auto shadow-md text-red-500'
                  onClick={() => setShowDialog(true)}>Delete</button>
               </div>}
          </div>
        <hr className="h-[2px] my-4 bg-slate-50 border-0"></hr>
        <div className='news-body'
            onClick={goToNewsPage}>
            <p style={{lineHeight: "1"}}>
              {shortVersion ? news.body.length < 350 ? news.body : news.body.slice(0, 350).concat("...  Click to read all.") : news.body}
            </p>
        </div>
        <div className='flex justify-end w-full'>
          <p className='text-sm italic'>{news.creationDate.toLocaleDateString()} <span className='text-md'> {news.author}</span></p>
        </div>
    </div>
  )
}
