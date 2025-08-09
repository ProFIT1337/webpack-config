import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';

type Mode = 'development' | 'production';

interface IEnvVariables {
  mode?: Mode,
  port?: number,
}

export default (env: IEnvVariables) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: webpack.Configuration = {
    mode: env.mode,
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: `bundle-[name].[contenthash].js`,
      chunkFilename: `bundle-[name].[contenthash].js`,
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      isDev && new ReactRefreshWebpackPlugin(), // добавляем Fast Refresh
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    ].filter(Boolean) as webpack.WebpackPluginInstance[],
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [
                isDev && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          // exclude: /node_modules/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev
      ? {
          port: env.port ?? 3000,
          hot: true, // включаем HMR
          open: false,
          historyApiFallback: true, // если SPA
        } as DevServerConfiguration
      : undefined,
  };

  return config;
};