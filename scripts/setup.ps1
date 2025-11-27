# Grimoire Stack - Quick Setup Script (PowerShell)
# Run this to set up the entire project

Write-Host "🎃 Grimoire Stack Setup" -ForegroundColor Magenta
Write-Host "=======================" -ForegroundColor Magenta
Write-Host ""

# Check Node version
Write-Host "📋 Checking Node.js version..." -ForegroundColor Cyan
$nodeVersion = (node -v).Substring(1).Split('.')[0]
if ([int]$nodeVersion -lt 18) {
    Write-Host "❌ Node.js 18+ required. You have: $(node -v)" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $(node -v)" -ForegroundColor Green
Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Copy environment files
Write-Host "📝 Setting up environment files..." -ForegroundColor Cyan
if (!(Test-Path "skeleton-core/.env")) {
    Copy-Item "skeleton-core/.env.example" "skeleton-core/.env"
}
if (!(Test-Path "apps/haunted-tasks/.env")) {
    Copy-Item "apps/haunted-tasks/.env.example" "apps/haunted-tasks/.env"
}
if (!(Test-Path "apps/coven-crm/.env")) {
    Copy-Item "apps/coven-crm/.env.example" "apps/coven-crm/.env"
}
Write-Host "✅ Environment files created" -ForegroundColor Green
Write-Host ""

# Generate Prisma clients
Write-Host "🔧 Generating Prisma clients..." -ForegroundColor Cyan
Set-Location skeleton-core
npx prisma generate
Set-Location ..

Set-Location apps/haunted-tasks
npx prisma generate
Set-Location ../..

Set-Location apps/coven-crm
npx prisma generate
Set-Location ../..
Write-Host "✅ Prisma clients generated" -ForegroundColor Green
Write-Host ""

# Push database schemas
Write-Host "🗄️  Creating databases..." -ForegroundColor Cyan
Set-Location skeleton-core
npx prisma db push
Set-Location ..

Set-Location apps/haunted-tasks
npx prisma db push
Set-Location ../..

Set-Location apps/coven-crm
npx prisma db push
Set-Location ../..
Write-Host "✅ Databases created" -ForegroundColor Green
Write-Host ""

# Seed data
Write-Host "🌱 Seeding demo data..." -ForegroundColor Cyan
Set-Location skeleton-core
npm run db:seed
Set-Location ..
Write-Host "✅ Demo data seeded" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Start the development servers:" -ForegroundColor Yellow
Write-Host "   npm run dev          # Both apps"
Write-Host "   npm run dev:tasks    # Haunted Tasks only (port 3000)"
Write-Host "   npm run dev:crm      # Coven CRM only (port 3001)"
Write-Host ""
Write-Host "🔐 Demo accounts:" -ForegroundColor Yellow
Write-Host "   demo@grimoire.dev"
Write-Host "   witch@coven.dev"
Write-Host ""
Write-Host "Happy haunting! 👻" -ForegroundColor Magenta
