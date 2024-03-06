import React from 'react'

export default function DeleteConfirmationDialog({onConfirm, onCancel}: {onConfirm : () => void, onCancel: () => void}) {
  return (
    <div className='flex flex-col p-10 fixed inset-0 bg-slate-50 border-2 mx-auto my-auto w-fit h-fit rounded-md'>
        <p className='text-primary text-xl'>Are you sure you want to delete this news?</p>
        <div className='flex p-5 justify'>
            <button className='  bg-red-100 hover:bg-red-200/[0.9] p-1 rounded-lg px-2  mx-auto shadow-md text-red-500' 
            onClick={onConfirm}>Yes</button>
            <button className='bg-secondary/[0.6] hover:bg-secondary/[0.9] p-1 rounded-lg px-2  mx-auto shadow-md text-primary' 
            onClick={onCancel}>No</button>
        </div>
    </div>
  )
}
