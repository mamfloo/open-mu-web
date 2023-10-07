import {prisma} from '@/lib/prisma'
import { Guild } from '@prisma/client'


export default async function TopGuilds() {

  const guilds: Guild[] = await getTop5Guilds();

  return (
    <div className="w-72 flex flex-col gap-5 mx-auto mt-3">
      <h2 className='text-2xl font-semibold  text-primary p-3 text-center rounded-lg bg-gradient-to-r
      from-oceanic via-secondary/[0.5] to-oceanic'>Guilds Ranking</h2>
      <table className=''>
        <thead>
          <tr>
            <th className='font-bold pl-3 text-primary pb-4 text-start'>#</th>
            <th className='font-bold text-primary pb-4'>Name</th>
            <th className='font-bold text-primary pb-4 text-center pl-5'>Score</th>
          </tr>
        </thead>
        <tbody>
          {guilds.map((g, i) => (
            <tr key={g.Name} className=''>
              <td className=' font-normal text-primary pb-3 pl-3  text-start'>{i+1}</td>
              <td className=' font-normal text-primary pb-3 text-center'>{g.Name}</td>
              <td className=' font-normal text-primary pb-3 pl-5 text-center'>{g.Score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

async function getTop5Guilds() {
  const guilds: Guild[] = await prisma.guild.findMany({
    take: 5,
    orderBy: {
      Score: "desc"
    }
  })
  return guilds;
}

