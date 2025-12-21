import fs from "fs";
import path from "path";
import Link from "next/link";
import { useMemo } from "react";

function b64Encode(str) {
  // browser-safe base64 for unicode
  return typeof window === "undefined"
    ? Buffer.from(str, "utf8").toString("base64")
    : btoa(unescape(encodeURIComponent(str)));
}

function RegistryLinkCard({ url }) {
  return (
    <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
      <div className="text-center text-sm font-semibold text-slate-900">
        Workspace Registry Link
      </div>

      <div className="mt-3 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <code className="block break-all rounded-xl bg-white px-4 py-3 text-xs text-slate-800 ring-1 ring-black/10">
          {url}
        </code>

        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
            } catch (_) {}
          }}
          className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default function Home({ workspaces = [], listUrl = "", search = "" }) {

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = Array.isArray(workspaces) ? workspaces : [];
    if (!q) return arr;

    return arr.filter((ws) => {
      const name = (ws?.friendly_name || ws?.name || "").toLowerCase();
      const desc = (ws?.description || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [workspaces, search]);

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-10">
        {listUrl ? <RegistryLinkCard url={listUrl} /> : null}

        <div className="mx-auto mt-10 flex w-fit overflow-hidden rounded-lg shadow-sm ring-1 ring-black/10">
          <div className="bg-white px-5 py-2 text-xs font-bold tracking-[0.35em] text-slate-700">
            WORKSPACES
          </div>
          <div className="bg-blue-600 px-4 py-2 text-xs font-bold text-white">
            {items.length}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((ws) => {
            const label = ws?.friendly_name || ws?.name || "Workspace";
            const desc = ws?.description || "";
            const routeKey = ws?.name || ws?.friendly_name || label;
            const href = `/new/${b64Encode(routeKey)}`;

            return (
              <Link
                key={routeKey}
                href={href}
                className="group rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                <div className="text-lg font-extrabold text-slate-900">
                  {label}
                </div>
                {desc ? (
                  <div className="mt-2 text-sm text-slate-700">{desc}</div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
                  {(ws?.compatibility || []).slice(0, 3).map((c, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white px-2 py-1 ring-1 ring-black/10"
                    >
                      {c?.version || "unknown"}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs font-semibold text-blue-700 opacity-0 transition group-hover:opacity-100">
                  View details →
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const listPath = path.resolve(process.cwd(), "..", "public", "list.json");
    const raw = fs.readFileSync(listPath, "utf8");
    const data = JSON.parse(raw);

    return {
      props: {
        workspaces: Array.isArray(data?.workspaces) ? data.workspaces : [],
        listUrl: typeof data?.list_url === "string" ? data.list_url : "",
      },
    };
  } catch {
    return { props: { workspaces: [], listUrl: "" } };
  }
}
