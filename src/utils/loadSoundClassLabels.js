import RNFS from 'react-native-fs';

export const loadSoundClassLabels = async () => {
  try {
    const filePath = `${RNFS.MainBundlePath}/sounds.json`; // Update this path as needed

    const content = await RNFS.readFile(filePath, 'utf8');
    const parsed = JSON.parse(content);

    // This gives you the array of label strings
    //const labels = parsed.map((entry) => entry.display_name);

    // Optional: If you want to use classifications too
     const fullEntries = parsed.map((entry) => ({
       label: entry.display_name,
       category: entry.classification,
     }));

    return fullEntries;
  } catch (err) {
    console.error('❌ Failed to load class labels:', err);
    return [];
  }
};
