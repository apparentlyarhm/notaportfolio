param (
    [string]$Workflow = "nextjs.yml"
)
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Configured WF: $Workflow and detected branch: $branch"

if (-not $branch)
{
    Write-Host "Error: Could not determine the current branch." -ForegroundColor Red
    exit 1
}
Write-Host "Triggering workflow '$Workflow' on branch '$branch'..." -ForegroundColor Cyan

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "Error: GitHub CLI (gh) is not installed. Please install it from https://cli.github.com/" -ForegroundColor Red
    exit 1
}

$authCheck = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: GitHub CLI is not authenticated. Please run 'gh auth login' to authenticate, or trigger the Workflow manually" -ForegroundColor Red
    exit 1

}
$runOutput = gh workflow run $Workflow --ref $branch

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to trigger workflow." -ForegroundColor Red
    exit 1
}

Write-Host "Workflow triggered successfully! Waiting for execution to start..." -ForegroundColor Green
Start-Sleep -Seconds 5

Write-Host "Fetching latest run.." -ForegroundColor Cyan
$runJson = gh run list --workflow $Workflow --branch $branch --limit 1 --json databaseId
if (-not $runJson)
{
    Write-Host "Error: Failed to retrieve workflow run details." -ForegroundColor Red
    exit 1
}
Write-Host "Success..." -ForegroundColor Green
$runObject = $runJson | ConvertFrom-Json

Write-Host "Detecting run details..." -ForegroundColor Cyan
if ($runObject -and $runObject.databaseId)
{
    $runId = $runObject.databaseId
    Write-Host "Sucesss: $runId" -ForegroundColor Green
    Write-Host "Streaming logs for run ID $runId..." -ForegroundColor Cyan
    gh run watch $runId
}
else
{
    Write-Host "Error: Could not retrieve a valid run ID." -ForegroundColor Red
    exit 1
}
