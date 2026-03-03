import Bubbles from "./Bubbles";
import Link from "next/link";
import { useRouter } from "next/router";
import { NotificationManager } from "react-notifications";

export default function Header({ searchText, changeSearch }) {
  const router = useRouter();
  const listUrl =
    typeof process.env.listUrl === "string" && process.env.listUrl
      ? process.env.listUrl
      : `${typeof window !== "undefined" ? window.location.origin : ""}${router.basePath}/`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(listUrl).then(
        () => NotificationManager.info("URL copied to clipboard", "Copy URL", 4000),
        () => fallbackCopy()
      );
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const textField = document.createElement("textarea");
    textField.value = listUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    NotificationManager.info("URL copied to clipboard", "Copy URL", 4000);
  };

  return (
    <header className="sw-topbar relative overflow-hidden">
      <Bubbles />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {process.env.name || "Kasm Registry"}
            </h1>
            <div className="mt-1 flex flex-wrap justify-center gap-0.5 text-xs tracking-[0.35em] uppercase text-[#c0c0c0] md:justify-start">
              <span>W</span><span>o</span><span>r</span><span>k</span><span>s</span><span>p</span><span>a</span><span>c</span><span>e</span>
              <span>&nbsp;</span>
              <span>R</span><span>e</span><span>g</span><span>i</span><span>s</span><span>t</span><span>r</span><span>y</span>
            </div>
          </div>

          {/* Nav + Search + Registry Link */}
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-end">
            <div className="flex items-center gap-2">
              <a
                href={`${router.basePath}/`}
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20 transition hover:bg-white/10"
              >
                Library
              </a>
              <Link
                href="/add"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20 transition hover:bg-white/10"
              >
                New
              </Link>
            </div>

            <input
              type="text"
              value={searchText ?? ""}
              onChange={(e) => changeSearch?.(e.target.value)}
              placeholder="Search for workspace"
              className="w-full rounded-xl border-0 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-[#a0a0a0] ring-1 ring-white/20 outline-none focus:bg-white/15 focus:ring-2 focus:ring-white/30 md:w-64"
            />

            <button
              type="button"
              onClick={copyToClipboard}
              className="rounded-xl bg-[#212830] px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20 transition hover:bg-[#2b333d]"
            >
              Workspace Registry Link
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
