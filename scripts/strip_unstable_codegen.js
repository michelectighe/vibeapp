const fs = require('fs');
const path = require('path');

const nodeModulesPath = path.resolve(__dirname, '../node_modules');

// List of known problematic packages to patch
const packagesToPatch = [
  // 'react-native-svg',
  // '@react-native-async-storage/async-storage',
  //'react-native-screens',
  //'react-native-reanimated',
  //'react-native-gesture-handler',
  //'vision-camera-resize-plugin',
  //'react-native-vector-icons',
  //'react-native-safe-area-context',
  // 'react-native-fast-tflite',
  // 'react-native-keychain',
  // 'react-native-worklets-core',
  // 'react-native',


  // Add others here if needed
];

console.log('🔍 Scanning for codegenConfig in node_modules...\n');

function getAllPackages(dirPath) {
  const packages = [];

  fs.readdirSync(dirPath).forEach((entry) => {
    const entryPath = path.join(dirPath, entry);

    if (entry.startsWith('@')) {
      // Scoped packages
      fs.readdirSync(entryPath).forEach((scopedPkg) => {
        packages.push(path.join(entry, scopedPkg));
      });
    } else {
      packages.push(entry);
    }
  });

  return packages;
}

const allPackages = getAllPackages(nodeModulesPath);

allPackages.forEach((pkgName) => {
  const pkgJsonPath = path.join(nodeModulesPath, pkgName, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) return;

  try {
    const raw = fs.readFileSync(pkgJsonPath, 'utf-8');
    const pkg = JSON.parse(raw);

    if (pkg.codegenConfig) {
      const isPatched = packagesToPatch.includes(pkgName);

      if (isPatched) {
        console.log(`🛠  Stripping codegenConfig from ${pkgName}`);
        delete pkg.codegenConfig;
        fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2));
      } else {
        console.log(`⚠️  Detected codegenConfig in ${pkgName} (not auto-patched)`);
      }
    }
  } catch (err) {
    console.warn(`❌ Failed to process ${pkgName}:`, err.message);
  }
});

console.log('\n✅ Done scanning node_modules.\n');
