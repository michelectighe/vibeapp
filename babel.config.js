module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        '@': './src',
                        '@assets': './assets',
                        '@components': './src/components',
                        '@config': './src/config',
                        '@constants': './src/constants',
                        '@context': './src/context',
                        '@data': './src/data',
                        '@database': './src/database',
                        '@features': './src/features',
                        '@hooks': './src/hooks',
                        '@navigation': './src/navigation',
                        '@screens': './src/screens',
                        '@services': './src/services',
                        '@styles': './src/styles',
                        '@utils': './src/utils',
                    },
                },
            ],
            "react-native-worklets-core/plugin",
            "react-native-reanimated/plugin",
        ],
        overrides: [
            {
                test: /node_modules[\/\\]react-native-vision-camera-face-detector[\/\\].*\.js$/,
                plugins: ["react-native-worklets-core/plugin"],
            },
            {
                test: /node_modules[\/\\]vision-camera-resize-plugin[\/\\].*\.js$/,
                plugins: ["react-native-worklets-core/plugin"],
            },
        ],
    };
};
