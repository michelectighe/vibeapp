import { registerRootComponent } from 'expo';
import { TurboModuleRegistry } from 'react-native'; // ✅ ADD THIS
import App from './App';

// import { unstable_disableTurboModules } from "@utils";

// //Patch TurboModuleRegistry to disable unstable modules
// const realGet = TurboModuleRegistry.get;
// TurboModuleRegistry.get = (name) => {
//     if (unstable_disableTurboModules.includes(name)) {
//         console.warn(`⚡ Skipping TurboModule for: ${name}`);
//         return null;
//     }
//     return realGet(name);
// };
// const allTurboNames = [
//     'TrackPlayerModule',
//     'ExpoSplashScreen',
//     'ExpoSQLite',
//     'ExponentConstants',
//     'RNReanimatedModule',
//     'RNScreensModule',
//     'RNSVGModule',
// ];

// allTurboNames.forEach(name => {
//     try {
//         const mod = TurboModuleRegistry.get(name);
//         if (mod) console.log(`✅ Loaded TurboModule: ${name}`);
//         else console.log(`❌ Disabled TurboModule: ${name}`);
//     } catch (e) {
//         console.log(`⚠️ Error checking module ${name}:`, e);
//     }
// });





// This makes it work for both Expo dev and native builds
registerRootComponent(App);
