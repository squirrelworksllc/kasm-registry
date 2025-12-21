import Link from "next/link";
import { useRouter } from "next/router";

function NavLink({ href, children }) {
  const router = useRouter();
  const active = router.asPath === href || (href !== "/" && router.asPath.startsWith(href));
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        active ? "bg-gray-900 text-white" : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-xl font-extrabold tracking-tight">SquirrelWorks Registry!</div>
          <div className="text-sm tracking-[0.55em] uppercase text-gray-600">Workspace Registry</div>

          <div className="mt-2 flex items-center gap-2">
            <NavLink href="/">Library</NavLink>
            <NavLink href="/new">New</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
