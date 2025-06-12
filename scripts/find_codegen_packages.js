const fs = require("fs");
const path = require("path");

const nodeModulesPath = path.resolve(__dirname, "../node_modules");
let found = [];

function scanDirectory(basePath) {
  const entries = fs.readdirSync(basePath);

  for (const entry of entries) {
    const fullPath = path.join(basePath, entry);

    // If this is a scope (e.g., @react-native), recurse
    if (entry.startsWith("@")) {
      const scopedPackages = fs.readdirSync(fullPath);
      scopedPackages.forEach((pkg) => scanPackage(path.join(fullPath, pkg), `${entry}/${pkg}`));
    } else {
      scanPackage(fullPath, entry);
    }
  }
}

function scanPackage(pkgPath, displayName) {
  const pkgJsonPath = path.join(pkgPath, "package.json");
  if (!fs.existsSync(pkgJsonPath)) return;

  try {
    const raw = fs.readFileSync(pkgJsonPath, "utf-8");
    const pkg = JSON.parse(raw);

    if (pkg.codegenConfig) {
      found.push({ name: displayName, path: pkgJsonPath });
    }
  } catch (err) {
    console.warn(`❌ Failed to read ${pkgJsonPath}: ${err.message}`);
  }
}

// Run the scan
scanDirectory(nodeModulesPath);

// Output results
// if (found.length > 0) {
//   found.forEach((entry) => //console.log(`🧩 ${entry.name}\n    ↳ ${entry.path}`));
//   //console.log("\n❗ You should patch these or remove their codegenConfig to disable codegen.\n");
//   process.exit(1)
// } else {
//   //console.log("✅ No codegenConfig found in any package.\n");
// }
