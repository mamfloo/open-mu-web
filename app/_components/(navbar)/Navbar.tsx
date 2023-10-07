import Link from "next/link"

export default function Navbar() {
  return (
    <nav>
        <ul className="flex gap-6 justify-center align-center text-xl text-primary mt-5">
            <li><Link href="/" className="hover:underline-offset-4 hover:bg-tertiary/[0.1] p-4 align-middle inline-block">HOME</Link></li>
            <li><Link href="/info" className="hover:underline-offset-4 hover:bg-tertiary/[0.1] p-4 align-middle inline-block">INFO</Link></li>
            <li><Link href="/ranking" className="hover:underline-offset-4 hover:bg-tertiary/[0.1] p-4 align-middle inline-block">RANKING</Link></li>
            <li><Link href="/download" className="hover:underline-offset-4 hover:bg-tertiary/[0.1] p-4 align-middle inline-block">DOWNLOAD</Link></li>
        </ul>
    </nav>
  )
}
