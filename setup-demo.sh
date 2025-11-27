#!/bin/bash

echo "🎃 Setting up Grimoire Stack for Demo..."
echo ""

echo "📦 Installing root dependencies..."
npm install

echo ""
echo "📦 Installing Haunted Tasks dependencies..."
cd apps/haunted-tasks
npm install
cd ../..

echo ""
echo "📦 Installing Coven CRM dependencies..."
cd apps/coven-crm
npm install
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the demo, run:"
echo "   npm run dev"
echo ""
echo "📱 Apps will be available at:"
echo "   Haunted Tasks: http://localhost:3000"
echo "   Coven CRM:     http://localhost:3001"
echo ""
echo "🔐 Login with: demo@grimoire.dev"
echo ""
