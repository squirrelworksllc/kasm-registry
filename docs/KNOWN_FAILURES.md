# Known Failure Modes & Recovery

This document lists common ways the registry can break and how to recover.

---

## ❌ Invalid Schema in Kasm

**Symptoms**
- Kasm reports "Invalid registry schema"
- `list.json` loads but Kasm rejects it

**Causes**
- Missing required fields
- `list_url` or `icon` set to null
- Manual edits to generated files

**Fix**
1. Revert `main` to last known-good commit
2. Let CI regenerate registry
3. Verify `/list.json` directly in browser

---

## ❌ Next.js Build Failure

**Symptoms**
- GitHub Actions build fails
- Errors about duplicate routes

**Common Causes**
- `/new` and `/new[[...workspace]]` both exist
- Page added with conflicting specificity

**Fix**
- Remove the conflicting page
- Keep only optional catch-all route

---

## ❌ Missing Icons

**Symptoms**
- Blank or broken icons in storefront

**Causes**
- `image_src` path incorrect
- Icon file missing

**Fix**
- Ensure icon exists
- Match filename exactly (case-sensitive)

---

## ❌ Footer Floating / Extra Space

**Cause**
- Page not filling viewport height

**Fix**
- Ensure `_app.js` uses:
  ```
  min-h-screen flex flex-col
  ```

---

## 🛑 Do NOT Fix By

- Editing `gh-pages` manually
- Forcing schema values
- Patching generated files

---

## ✅ Golden Rule

If CI can regenerate it, **don’t touch it by hand**.
