module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'], // 根目录
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'], // 可以解析的后缀名
        // 路径别名
        alias: {
          '@src': './src',
          '@config': './src/config',
          '@res': './src/assets',
        },
      },
    ],
  ],
};
