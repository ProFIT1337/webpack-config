import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';


type Mode = 'development' | 'production';

interface IEnvVariables {
  mode?: Mode,
  port?: number,
}

// const devServer: DevServerConfiguration = {};

export default (env: IEnvVariables) => {
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `bundle-[name].[contenthash].js`,
        chunkFilename: `bundle-[name].[contenthash].js`,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? {
      port: env.port ?? 3000,
      open: false,
    } as DevServerConfiguration : undefined,
  }

  return config;
    
};