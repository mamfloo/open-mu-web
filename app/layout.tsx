import './globals.css'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import Navbar from './_components/(navbar)/Navbar'
import SecondaryNav from './_components/(navbar)/SecondaryNav'
import Footer from './_components/(footer)/Footer'
import Section1 from './_components/(sections)/(section1NewsAndUserPanel)/Section1'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ServerStatistics from './_components/(sections)/(Section2MainAndRankings)/ServerStatistics'
import TopPlayers from './_components/(sections)/(Section2MainAndRankings)/TopPlayers'
import TopGuilds from './_components/(sections)/(Section2MainAndRankings)/TopGuilds'

const lora = Lora({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'OpenMU Web',
  description: 'Created by mamflo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lora.className} m-0 flex flex-col items-center w-full bg-[url('~/public/img/bg-header.jpg')] bg-top bg-no-repeat`}>
        <Navbar />
        <SecondaryNav />
        <div className="w-[1250px] pb-10 justify-center content-center mt-[120px] bg-oceanic/[0.7] z-10 shadow-2xl shadow-slate-600 -mb-52">
          <Section1 />
          <div className="w-full h-2/3  flex justify-between gap-2">
            {children}
            <div className="flex flex-col w-1/3 h-max gap-2">
              <ServerStatistics />
              <TopPlayers />
              <TopGuilds />
            </div>
          </div> 
        </div>
        <Footer />
        <ToastContainer position='top-right'
          autoClose={3000}
          closeOnClick
          pauseOnHover
          theme='light'/>
      </body>
    </html>
  )
}
