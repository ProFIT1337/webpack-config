import webpack from 'webpack';
import buildDevServer from './buildDevServer';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import {IWebpackOptions} from './types/types';

export function buildWebpack(options: IWebpackOptions): webpack.Configuration {
    const isDev = options.mode === 'development';

    return {
        mode: options.mode,
        entry: options.paths.entry,
        output: {
          path: options.paths.output,
          filename: `bundle-[name].[contenthash].js`,
          chunkFilename: `bundle-[name].[contenthash].js`,
          clean: true,
        },
        plugins: buildPlugins(options),
        module: buildLoaders(options),
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev ? buildDevServer(options) : undefined,
      } 
};