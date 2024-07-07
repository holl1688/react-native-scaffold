const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (() => {
  const defaultConfig = getDefaultConfig(__dirname);

  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;

  const customConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };

  return mergeConfig(defaultConfig, customConfig);
})();
