import Link from "next/link";
import { useRouter } from "next/router";

export default function Workspace({ workspace }) {
  const router = useRouter();
  const base = router.basePath || "";
  const friendlyName = workspace?.friendly_name || workspace?.name || "Workspace";
  const slug = typeof friendlyName === "string" ? btoa(friendlyName) : "";
  const href = `${base}/new/${slug}`;
  const category = workspace?.categories?.[0] || "Unknown";
  const iconSrc = workspace?.image_src
    ? `${base}/icons/${workspace.image_src}`
    : null;

  return (
    <Link
      href={href}
      className="group relative flex h-[88px] w-full max-w-[280px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-slate-100/90 p-3 shadow transition-all hover:bg-gradient-to-r hover:from-slate-600 hover:to-slate-700 hover:text-white hover:shadow-xl"
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          className="h-12 w-12 flex-shrink-0 rounded-lg object-contain"
          loading="lazy"
        />
      ) : (
        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-slate-300/80" />
      )}
      <div className="min-w-0 flex-1 text-left">
        <div className="font-bold text-slate-800 group-hover:text-white">
          {friendlyName}
        </div>
        <div className="text-xs text-slate-600 group-hover:text-white/90">
          {category}
        </div>
      </div>
    </Link>
  );
}
