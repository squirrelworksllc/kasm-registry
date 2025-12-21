import fs from "fs";
import path from "path";
import styles from "../styles/Home.module.css";

export default function Home({ workspaces = [] }) {
  const items = Array.isArray(workspaces) ? workspaces : [];

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {items.map((ws) => (
          <div key={ws?.name || ws?.friendly_name} className={styles.card}>
            <div className={styles.title}>{ws?.friendly_name || ws?.name}</div>
            <div className={styles.meta}>{ws?.description || ""}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

// Static export needs data at build time.
// The build script runs `node processing` first, which writes repo-root ./public/list.json
export async function getStaticProps() {
  try {
    const listPath = path.resolve(process.cwd(), "..", "public", "list.json");
    const raw = fs.readFileSync(listPath, "utf8");
    const data = JSON.parse(raw);

    return {
      props: {
        workspaces: Array.isArray(data?.workspaces) ? data.workspaces : [],
      },
    };
  } catch {
    return { props: { workspaces: [] } };
  }
}
