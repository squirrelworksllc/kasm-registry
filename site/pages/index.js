import fs from "fs";
import path from "path";

function CopyableLink({ url }) {
  return (
    <div className="mt-6 w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-4">
      <div className="text-sm font-semibold text-gray-900">Workspace Registry Link</div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <code className="block break-all rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-800">{url}</code>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
            } catch (_) {}
          }}
          className="inline-flex justify-center rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default function Home({ workspaces = [], listUrl = "" }) {
  const items = Array.isArray(workspaces) ? workspaces : [];
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {listUrl ? <CopyableLink url={listUrl} /> : null}

      <h1 className="mt-10 text-2xl font-extrabold tracking-tight">Workspaces</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-gray-700">
          <div className="font-semibold">No workspaces found</div>
          <div className="mt-1 text-sm text-gray-600">If this is unexpected, verify your workspaces folder and rebuild.</div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((ws) => (
            <div key={ws?.name || ws?.friendly_name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-bold text-gray-900">{ws?.friendly_name || ws?.name}</div>
              {ws?.description ? <div className="mt-2 text-sm text-gray-700">{ws.description}</div> : null}
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
                {(ws?.compatibility || []).slice(0, 3).map((c, idx) => (
                  <span key={idx} className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1">
                    {c?.version || "unknown"}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
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
