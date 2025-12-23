# Contributing to SquirrelWorks Kasm Registry

Thanks for your interest in contributing to the **SquirrelWorks Kasm Registry**.

This repository is intentionally curated and schema-driven. Contributions are welcome, but **not all parts of the repository are open for modification**, and all new workspaces require prior approval.

Please read the guidelines below carefully before opening an issue or pull request.

---

## 📚 Table of Contents

- [General Guidelines](#-general-guidelines)
- [Restricted Areas](#-restricted-areas-read-this-first)
- [Contributing a New Workspace](#-contributing-a-new-workspace)
  - [Get Approval First](#1-get-approval-first)
  - [Follow the Workspace Contribution Guide](#2-follow-the-workspace-contribution-guide)
  - [Open a Pull Request](#3-open-a-pull-request)
- [Questions or Proposals](#-questions-or-proposals)

---

## 🧭 General Guidelines

- Keep changes **focused and minimal**
- Follow existing patterns in the repository
- Favor clarity and documentation over cleverness
- Do not assume something is open for contribution unless explicitly documented
- If unsure, **ask before implementing**

This registry prioritizes **stability, predictability, and long-term maintainability**.

---

## 🚫 Restricted Areas (Read This First)

The following areas are **not open to modification** via pull requests:

- The website / storefront UI
- Static site layout, styling, or branding
- Registry schema versions and version routing
- Build and publishing infrastructure

Pull requests that attempt to modify these areas will be closed without review.

---

## ➕ Contributing a New Workspace

If you would like to contribute a **new workspace image**, follow this process exactly.

### 1. Get Approval First
Before starting any development work, **you must contact the repository owner** to request approval.

This ensures:
- The workspace aligns with the registry’s scope and standards
- Duplicate or conflicting images are avoided
- Expectations are clear before time is invested

Opening a pull request without prior approval may result in it being closed.

---

### 2. Follow the Workspace Contribution Guide
Once approved, all technical instructions for adding a workspace are documented here:

📄 **[`docs/ADDING_A_WORKSPACE.md`](docs/ADDING_A_WORKSPACE.md)**

This guide covers:
- Required repository structure
- Metadata and schema requirements
- Image naming and versioning conventions
- Validation expectations

Deviations from this guide will require explicit justification.

---

### 3. Open a Pull Request
When your workspace is ready:

- Open a pull request against the appropriate branch
- Clearly state that approval was granted
- Describe what the workspace provides and its intended use case
- Ensure all checks pass before requesting review

---

## ❓ Questions or Proposals

If you’re unsure whether something belongs in the registry, or want to propose a new idea:

- Contact the repository owner first
- Do not open speculative pull requests

Thanks for respecting the process.