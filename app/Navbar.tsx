import Link from 'next/link'

export default function Navbar() {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]
  return (
    <nav className="flex items-center h-14 space-x-6 px-6 border-b mb-5">
      <Link href="/">Logo</Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}
