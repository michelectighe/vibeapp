const path = require('path');
const generate = require('@react-native/codegen/lib/cli/generators/generate-all');

// Example for react-native-svg
generate({
  schemaPath: path.resolve(__dirname, '../node_modules/react-native-svg/lib/module/specs/'),
  outputDirectory: path.resolve(__dirname, '../ios/build/generated/ios/rnsvg'),
  libraryName: 'rnsvg',
  modules: ['SVGViewNativeComponent'], // This may vary — check which spec files exist
});
