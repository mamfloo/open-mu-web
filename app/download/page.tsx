import Image from "next/image";
import google from "@/public/img/download/google.png";
import mediafire from "@/public/img/download/mediafire.png";
import mega from "@/public/img/download/mega.png";
import netframework from "@/public/img/download/netframework.png";
import visual from "@/public/img/download/visual.png";
import Link from "next/link";

export default function Download() {

  const gdLink = process.env.NEXT_PUBLIC_GOODLE_DRIVE_LINK
  const mfLink = process.env.NEXT_PUBLIC_MEDIAFIRE_LINK
  const megaLink = process.env.NEXT_PUBLIC_MEGA_LINK

  return (
    <div className="m-auto py-10 px-20 flex flex-col w-full">
      <div>
        <h2 className="text-2xl text-primary">Client Downloads</h2>
        <hr className="border-t-2 border-slate-300"/>
        <p className="text-lg text-primary">Downlaod the client for free</p>
        <div className="flex gap-10 mt-10">
          {(gdLink && gdLink !== "")&& <Link href={process.env.NEXT_PUBLIC_GOODLE_DRIVE_LINK!}><Image src={google} width={180} quality={100} alt={"google_drive"} /></Link>}
          {(mfLink && mfLink !== "") && <Link href={process.env.NEXT_PUBLIC_MEDIAFIRE_LINK!}><Image src={mediafire} width={180} quality={100} alt={"mediafire"}/></Link>}
          {(megaLink && megaLink !== "") && <Link href={process.env.NEXT_PUBLIC_MEGA_LINK!}><Image src={mega} width={180} quality={100} alt={"mega"}/></Link>}          
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl text-primary">Utilities</h2>
        <hr className="border-t-2 border-slate-300"/>
        <p className="text-lg text-primary">Make sure you downlaod the latest drivers</p>
        <div className="flex gap-10 mt-10">
          <Link href="https://dotnet.microsoft.com/en-us/download"><Image src={netframework} width={180} quality={100} alt={"dotnet"}/></Link>
          <Link href="https://dotnet.microsoft.com/en-us/download"><Image src={visual} width={180} quality={100} alt={"dotnet"}/></Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl text-primary">System Requirements</h2>
        <hr className="border-t-2 border-slate-300"/>
        <p className="text-lg text-primary">Check if your hardware is enough to give you a good gaming experience</p>
        <table className="mt-8">
          <thead>
            <tr className="text-primary text-xl">
              <th className="bg-secondary/[0.7] px-10 py-3">Component</th>
              <th className="bg-secondary/[0.7] px-6 py-3">Minimum Requirements</th>
              <th className="bg-secondary/[0.7] px-6 py-3">Recomendend Requirements</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">Operating System</td>
              <td>Windows XP</td>
              <td>Windows 10</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">Processor</td>
              <td>Pentium 3 700Mhz</td>
              <td>Pentium 4 2.0Ghz</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">System Memory</td>
              <td>1GB</td>
              <td>4GB</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">Video Card</td>
              <td>128MB or higher</td>
              <td>128MB or higher</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">Direct X version</td>
              <td>DirectX 8.1a</td>
              <td>DirectX 9.0c</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">HardDisk Space</td>
              <td>1GB</td>
              <td>1GB</td>
            </tr>
            <tr className="text-center py-5 border-b-2">
              <td className="py-3">Framework Version</td>
              <td>Net Framework 7</td>
              <td>Net Framework 7</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </div>
  )
}
