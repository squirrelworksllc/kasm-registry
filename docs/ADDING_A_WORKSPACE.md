# Adding a Workspace

This repo publishes a Kasm registry schema version (example `1.1`) as a static site.
Adding a workspace is usually:

1. Add a workspace JSON file (and its icon)
2. Validate JSON
3. Build locally (recommended)
4. Open a PR and let CI build/publish

---

## Checklist

- [ ] Choose the correct schema branch (ex: `1.1`)
- [ ] Add / update the workspace JSON file
- [ ] Add the `image_src` icon asset
- [ ] Ensure `compatibility[].image` points to a real image/tag you publish
- [ ] Ensure `compatibility[].available_tags` matches what you actually publish
- [ ] Keep `categories` to **3 or fewer**
- [ ] Build locally (recommended)
- [ ] PR → checks pass → merge

---

## Naming & placement (recommended)

**Workspace JSON**
- Location: `workspaces/<name>.json` (or the equivalent path for the schema branch)
- Filename: lowercase; use `-` or `_`  
  Examples:
  - `ubuntu-noble-desktop.json`
  - `ubuntu-noble-dind.json`
  - `remnux.json`
  - `bitcurator5.json`

**Icon**
- Location: `images/` (or wherever your generator expects)
- PNG preferred
- `image_src` must match the filename exactly (case-sensitive on Linux/Pages)

---

## Workspace template (copy/paste)

This matches the “standard layout” you’ve been using:

```json
{
  "friendly_name": "Workspace Name",
  "image_src": "icon.png",
  "description": "One-sentence description.",
  "cores": 2,
  "memory": 2048,
  "gpu_count": 0,
  "cpu_allocation_method": "Inherit",
  "docker_registry": "https://index.docker.io/v1/",
  "categories": [
    "Desktop",
    "Category2",
    "Category3"
  ],
  "enabled": true,
  "image_type": "Container",
  "notes": "**⚠️ WARNING – OPTIONAL STATUS NOTE ⚠️**\n\nPut extra info here (known issues, usage notes, etc.).",
  "architecture": [
    "amd64"
  ],
  "run_config": {
    "hostname": "hostname-here"
  },
  "exec_config": {
    "go": {
      "cmd": "bash -c '/dockerstartup/custom_startup.sh --go --url \"$KASM_URL\"'"
    },
    "assign": {
      "cmd": "bash -c '/dockerstartup/custom_startup.sh --assign --url \"$KASM_URL\"'"
    }
  },
  "compatibility": [
    {
      "version": "1.18.x",
      "image": "yourorg/yourimage:1.18.0",
      "uncompressed_size_mb": 1234,
      "available_tags": [
        "1.18.0",
        "develop"
      ]
    }
  ]
}
```

### Template notes
- If you don’t need `gpu_count`, `run_config`, or `exec_config`, remove those blocks.
- Keep `categories` to max 3.
- Use `\n\n` inside `notes` when you want a paragraph break in Markdown-capable UIs (e.g., Docker Hub).

---

## Local validation tips

### Validate JSON quickly
```bash
jq . workspaces/your-workspace.json > /dev/null
```

### Catch missing icons / wrong paths
```bash
ls -la images/icon.png
```

### Build locally (recommended)
```bash
git checkout 1.1
npm ci
node processing
ls -la public/1.1/list.json
```

---

## PR expectations

In your PR description, include:
- Workspace name
- Docker image + tags (and whether `develop` exists)
- Icon filename
- Any special run requirements (privileged, extra caps, etc.)
- Known issues (if any)
