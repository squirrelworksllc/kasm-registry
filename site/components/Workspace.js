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
      className="group relative flex h-[88px] w-full max-w-[280px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#1f242b] p-3 shadow transition-all hover:bg-[#252b34] hover:shadow-lg"
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          className="h-12 w-12 flex-shrink-0 rounded-lg object-contain"
          loading="lazy"
        />
      ) : (
        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-white/10" />
      )}
      <div className="min-w-0 flex-1 text-left">
        <div className="font-bold text-white">
          {friendlyName}
        </div>
        <div className="text-xs text-[#a0a0a0]">
          {category}
        </div>
      </div>
    </Link>
  );
}
