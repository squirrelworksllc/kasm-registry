param(
    [int]$WaitSeconds = 120
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-CurrentBranch {
    (git rev-parse --abbrev-ref HEAD).Trim()
}

function Ensure-Clean-Tree {
    $status = (git status --porcelain)
    if ($status) {
        throw "Working tree is not clean. Commit/stash changes first.`n$status"
    }
}

function Ensure-RemoteBranch([string]$branch) {
    $exists = (git ls-remote --heads origin $branch)
    if (-not $exists) {
        throw "Remote branch 'origin/$branch' does not exist."
    }
}

function Checkout-Branch([string]$branch) {
    git show-ref --verify --quiet "refs/heads/$branch" | Out-Null
    if ($LASTEXITCODE -ne 0) {
        git checkout -b $branch "origin/$branch"
    } else {
        git checkout $branch
    }
}

function PullFF([string]$branch) {
    Checkout-Branch $branch
    git pull --ff-only origin $branch
}

function FastForwardTo([string]$targetBranch, [string]$sourceRef) {
    PullFF $targetBranch
    git merge --ff-only $sourceRef
    git push origin $targetBranch
}

function UpdateMainToSourceWithSyncCommit([string]$sourceRef, [string]$message) {
    Write-Host "`n==> Updating 'main' to '$sourceRef' and creating a sync commit"
    PullFF "main"

    # Make main match the source snapshot exactly
    git reset --hard $sourceRef

    # Create a "sync" commit (even if no file changes) using your message
    git commit --allow-empty -m $message

    git push origin main
}

# --- Start ---
Ensure-Clean-Tree
git fetch origin --prune

Ensure-RemoteBranch "main"
Ensure-RemoteBranch "1.1"

$startBranch = Get-CurrentBranch
Write-Host "Starting on branch: $startBranch"

# Decide what main should become:
# - If you're on a work branch: main becomes that branch snapshot
# - If you're on main: main stays main (but we still create a sync commit to satisfy message requirement)
# - If you're on 1.1: we update main from origin/main (then align 1.1 to main)
[string]$sourceForMain =
    if ($startBranch -eq "main") { "main" }
    elseif ($startBranch -eq "1.1") { "origin/main" }
    else { $startBranch }

# Ask once; this message is used for the sync commit on main
$commitMsg = Read-Host "Enter sync commit message for main"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    throw "Commit message cannot be empty."
}

# Update main first (with message + commit)
UpdateMainToSourceWithSyncCommit -sourceRef $sourceForMain -message $commitMsg

Write-Host "`nWaiting $WaitSeconds seconds for gh-pages publish jobs to complete..."
Start-Sleep -Seconds $WaitSeconds

# Then align 1.1 to main (no extra commit; keeps SHAs identical)
Write-Host "`n==> Aligning '1.1' to 'main'"
FastForwardTo -targetBranch "1.1" -sourceRef "main"

# Return to where you started
Checkout-Branch $startBranch

Write-Host "`n✅ Done."
Write-Host " - main updated and sync-committed"
Write-Host " - 1.1 fast-forwarded to main (same commit)"
Write-Host "Current branch: $(Get-CurrentBranch)"