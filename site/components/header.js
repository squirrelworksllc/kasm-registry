import Link from 'next/link';

export default function Header() 
{
  return (
    <header className="header bg-brand-50 border-b border-brand-200">
    <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2">
    {/* Logo (shown in grayscale); swap src as needed */}
    <img src="/logo.svg" alt="Logo" className="h-6" />
    <span className="text-brand-900 font-semibold">Kasm Registry</span>
    </Link>
    <nav className="flex items-center gap-3">
      <Link href="/docs" className="text-brand-700 hover:text-brand-900">Docs</Link>
      <Link href="/images" className="text-brand-700 hover:text-brand-900">Images</Link>
      <Link href="/about" className="text-brand-700 hover:text-brand-900">About</Link>
      <button className="btn-primary">New</button>
    </nav>
    </div>
    </header>
  );
}