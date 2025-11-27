#!/bin/bash

# Grimoire Stack - Quick Setup Script
# Run this to set up the entire project

set -e

echo "🎃 Grimoire Stack Setup"
echo "======================="
echo ""

# Check Node version
echo "📋 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
  echo "❌ Node.js 18+ required. You have: $(node -v)"
  exit 1
fi
echo "✅ Node.js $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Copy environment files
echo "📝 Setting up environment files..."
cp -n skeleton-core/.env.example skeleton-core/.env 2>/dev/null || true
cp -n apps/haunted-tasks/.env.example apps/haunted-tasks/.env 2>/dev/null || true
cp -n apps/coven-crm/.env.example apps/coven-crm/.env 2>/dev/null || true
echo "✅ Environment files created"
echo ""

# Generate Prisma clients
echo "🔧 Generating Prisma clients..."
cd skeleton-core && npx prisma generate && cd ..
cd apps/haunted-tasks && npx prisma generate && cd ../..
cd apps/coven-crm && npx prisma generate && cd ../..
echo "✅ Prisma clients generated"
echo ""

# Push database schemas
echo "🗄️  Creating databases..."
cd skeleton-core && npx prisma db push && cd ..
cd apps/haunted-tasks && npx prisma db push && cd ../..
cd apps/coven-crm && npx prisma db push && cd ../..
echo "✅ Databases created"
echo ""

# Seed data
echo "🌱 Seeding demo data..."
cd skeleton-core && npm run db:seed && cd ..
echo "✅ Demo data seeded"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "🚀 Start the development servers:"
echo "   npm run dev          # Both apps"
echo "   npm run dev:tasks    # Haunted Tasks only (port 3000)"
echo "   npm run dev:crm      # Coven CRM only (port 3001)"
echo ""
echo "🔐 Demo accounts:"
echo "   demo@grimoire.dev"
echo "   witch@coven.dev"
echo ""
echo "Happy haunting! 👻"
