const { composePlugins, withNx } = require('@nx/webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = composePlugins(withNx(), (config) => {
  config.target = 'node';
  config.externals = [nodeExternals()]; // исключает node_modules (оставляем только твой код)
  config.output = {
    ...config.output,
    filename: 'main.js',
  };
  return config;
});
// const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
// const { join } = require('path');

// module.exports = {
//   output: {
//     path: join(__dirname, '../../../dist/apps/backend/api'),
//   },
//   plugins: [
//     new NxAppWebpackPlugin({
//       target: 'node',
//       compiler: 'tsc',
//       main: './src/main.ts',
//       tsConfig: './tsconfig.app.json',
//       assets: ['./src/assets'],
//       optimization: false,
//       outputHashing: 'none',
//     }),
//   ],
// };

