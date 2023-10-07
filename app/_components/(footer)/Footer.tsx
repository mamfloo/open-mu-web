import Link from "next/link"

export default function Footer() {
  return (
    <div className="flex w-[1400px] h-[480px] bg-top bg-no-repeat bg-[url('~/public/img/bg-footer.jpg')]">
        <div className="w-1/3 h-[50%] mt-auto">
            <div className='ml-24 mt-12'>
                <p className='text-primary mb-7'>© OpenMUWeb</p>
                <p className='text-primary'>This site is is no way associated with <br /> or endorsed by Webzen Inc.</p>
            </div>
        </div>
        <div className="w-1/3 h-[50%] mt-auto">
            <div className='ml-24 mt-12'>
                <p className='text-primary mb-7'><Link href={"/terms-and-conditions"}>Terms and Conditions</Link> | <Link href={"https://discord.com/users/254951048437956610"} target="_blank">Contact</Link></p>
            </div>
        </div>
        <div className="w-1/3 h-[50%] mt-auto">

        </div>
    </div>
  )
}
