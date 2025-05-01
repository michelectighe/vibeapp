#!/bin/bash
#set -e

# echo "🔙 Moving back to project root..."
# cd ..

echo "🧹 Cleaning iOS build and DerivedData..."
cd ios

rm -rf Pods
rm -rf build
rm Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/VibeKey-*
rm -rf ~/Library/Caches/com.apple.dt.Xcode
rm -rf ios/DerivedData/*
npm cache clean --force
echo "📦 Installing Pods with New Architecture OFF..."
pod deintegrate
pod install
pod install --repo-update
npm run patch-h
cd ..

