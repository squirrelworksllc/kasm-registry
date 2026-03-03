import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Workspace from "../components/Workspace";

export default function Home({ searchText }) {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState(null);
  const [versions, setVersions] = useState(null);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    const listUrl = `${router.basePath}/list.json`;
    fetch(listUrl)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.workspaces ?? [];
        const versionSet = new Set();
        list.forEach((workspace) => {
          const compat = workspace.compatibility;
          if (Array.isArray(compat)) {
            compat.forEach((c) => {
              const v = typeof c === "object" && c?.version ? c.version : c;
              if (v && typeof v === "string") {
                const normalized = v.split(".").slice(0, 2).join(".");
                if (normalized) versionSet.add(normalized);
              }
            });
          }
        });
        const sorted = Array.from(versionSet).sort((a, b) => {
          const pa = a.split(".").map(Number);
          const pb = b.split(".").map(Number);
          for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const d = (pa[i] || 0) - (pb[i] || 0);
            if (d !== 0) return d;
          }
          return 0;
        }).reverse();

        setVersions(sorted);
        const stored = typeof localStorage !== "undefined" ? localStorage.getItem("kasm_version") : null;
        const initial = stored && sorted.includes(stored) ? stored : sorted[0] ?? null;
        if (initial && typeof localStorage !== "undefined") {
          localStorage.setItem("kasm_version", initial);
        }
        setVersion(initial);
        setWorkspaces(data);
      })
      .catch(() => setWorkspaces({ workspaces: [], workspacecount: 0 }));
  }, [router.basePath]);

  const updateVersion = (v) => {
    setVersion(v);
    if (typeof localStorage !== "undefined") localStorage.setItem("kasm_version", v);
  };

  const filteredWorkspaces = useMemo(() => {
    const list = workspaces?.workspaces ?? [];
    if (!version) return list;

    const cleanSearch = (searchText ?? "").toLowerCase().trim();

    return list.filter((workspace) => {
      const compat = workspace.compatibility;
      const versionStr = version.toString();
      const isCompatible = Array.isArray(compat) && compat.some((el) => {
        const v = typeof el === "object" && el?.version ? el.version : el;
        if (!v) return false;
        const prefix = typeof v === "string" ? v.split(".").slice(0, 2).join(".") : "";
        return prefix === versionStr;
      });
      if (!isCompatible) return false;
      if (!cleanSearch) return true;

      const name = (workspace.friendly_name || workspace.name || "").toLowerCase();
      const matchesName = name.includes(cleanSearch);
      const categories = workspace.categories ?? [];
      const matchesCategory = categories.some((cat) => String(cat).toLowerCase().includes(cleanSearch));
      return matchesName || matchesCategory;
    });
  }, [workspaces, version, searchText]);

  const count = workspaces?.workspacecount ?? 0;

  return (
    <>
      <Head>
        <title>{process.env.name || "Kasm Workspaces"}</title>
        <meta name="description" content="Workspace registry for Kasm Workspaces" />
      </Head>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-800">
          {process.env.name || "Kasm Workspaces"}
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <div className="flex overflow-hidden rounded-lg shadow ring-1 ring-black/10">
            <div className="bg-slate-200/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              Workspaces
            </div>
            <div className="bg-slate-600 px-4 py-2 text-xs font-bold text-white">
              {workspaces ? count : "—"}
            </div>
          </div>

          {versions && versions.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Kasm Version</span>
              <select
                value={version ?? ""}
                onChange={(e) => updateVersion(e.target.value)}
                className="rounded-lg border border-slate-400 bg-slate-100 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              >
                {versions.map((v) => (
                  <option key={v} value={v}>
                    {v}.x
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredWorkspaces.length > 0 ? (
            filteredWorkspaces.map((workspace) => (
              <Workspace key={workspace.friendly_name || workspace.name} workspace={workspace} />
            ))
          ) : (
            <p className="col-span-full text-slate-600">
              No workspaces found
              {searchText?.trim() ? ` matching "${searchText.trim()}"` : ""}.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
