module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        extensions: ['.ts', '.tsx', '.js'],
        root: ['.'],
        alias: {
          '@Components': './src/components',
          '@Config': './src/config',
          '@Images': './src/images',
          '@Routes': './src/routes',
          '@Store': './src/store',
          '@Utils': './src/utils',
          '@Hooks': './src/hooks',
        },
        regenerator: true,
      },
    ],
  ],
};
