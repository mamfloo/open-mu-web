import React from 'react'

export default function News() {
  return (
    <div className='  px-20 w-full'>
      <h1 className='text-2xl text-primary font-semibold mb-4'>NEWS</h1>
      <hr className='h-[2px] bg-primary/[0.4] mb-6'/>
      <div className='bg-slate-200 border-2 rounded-lg p-3  text-primary'>
        <h2 className='text-primary text-xl font-semibold'>Open MU Web</h2>
        <hr className="h-[2px] my-4 bg-slate-50 border-0"></hr>
        <div className=''>
          <p>Welcome to Open MU Web<br />
          hope this projects will help people with their MU.
          </p>
          <br />
          <p className='font-semibold text-lg'>Features:</p> <br />
          <p>Character Panel:</p>
          <ul>
            <li className='ml-5'>Reset system, can choose at what level to reset, max reset and the cost of reset. </li>
            <li className='ml-5'>Add Stats</li>
            <li className='ml-5'>ClearPk, can choose the price</li>
          </ul>
          <br />
          <p>Account Panel:</p> 
          <ul>
            <li className='ml-5'>Change Password</li>
          </ul>
          <br />
          <p>Rankings:</p>
          <ul>
            <li className='ml-5'>Top Reset, level, master level</li>
            <li className='ml-5'>Top Killers</li>
            <li className='ml-5'>Top Guilds</li>
            <li className='ml-5'>Online Players</li>
          </ul>
          <br />
          <p>Server Statistics:</p>
          <ul>
            <li className='ml-5'>Show server status</li>
            <li className='ml-5'>Show how many players are online</li>
          </ul>
          <br />
          <p>Register new Account</p>
          <p>Downlaod Section</p>
          <p>Info Section</p>
          <p>News Section</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
      <h2></h2>
    </div>
  )
}
