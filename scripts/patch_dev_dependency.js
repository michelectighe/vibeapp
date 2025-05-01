const fs = require('fs');
const path = require('path');

const podspecPath = path.join(__dirname, '../node_modules/expo-dev-launcher/expo-dev-launcher.podspec');
let content = fs.readFileSync(podspecPath, 'utf-8');

if (content.includes("s.dependency 'ReactAppDependencyProvider'")) {
    content = content.replace(/s\.dependency\s+['"]ReactAppDependencyProvider['"]\n?/, '');
    fs.writeFileSync(podspecPath, content);
    console.log('✅ Patched expo-dev-launcher.podspec to remove ReactAppDependencyProvider');
} else {
    console.log('✅ No need to patch — already clean');
}
