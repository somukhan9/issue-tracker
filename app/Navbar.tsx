import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex">
      <Link href="/">Logo</Link>
      <ul className="flex">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/issues">Issues</Link>
        </li>
        <li></li>
      </ul>
    </nav>
  )
}
