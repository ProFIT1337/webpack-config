import webpack from 'webpack';
import {buildWebpack} from './public/config/build/buildWebpack';
import {BuildModeType} from './public/config/build/types/types';
import path from 'path';

interface IEnvVariables {
  mode?: BuildModeType,
  port?: number,
}

export default (env: IEnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths: {
      entry: path.resolve(__dirname, 'src', 'index.tsx'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      output: path.resolve(__dirname, 'build'),
    },
    bundleAnalyzer: false,
  });

  return config;
};