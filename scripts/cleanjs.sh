#!/bin/bash
#set -e

# echo "🔙 Moving back to project root..."
# cd ..

echo "🧹 Cleaning & reinstalling node_modules..."

rm -rf node_modules
rm -rf package-lock.json
echo "📦 Installing node modules with New Architecture & takingn care of modules with no new arch..."
npm install