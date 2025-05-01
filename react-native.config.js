module.exports = {
    reactNativePath: './node_modules/react-native',
    unstable_disablePackageExports: true,
    project: {
        ios: {
            sourceDir: './ios',
        },
    },
    dependencies: {
        'react-native-track-player': {
            unstable_enableNewArchitecture: false,
        },
        'react-native-audio': {
            unstable_enableNewArchitecture: false,
        },
        'react-native-fs': {
            unstable_enableNewArchitecture: false,
        },
        'react-native-keychain': {
            unstable_enableNewArchitecture: false,
        },
        'react-native-biometrics': {
            unstable_enableNewArchitecture: false,
        },
    },
};
