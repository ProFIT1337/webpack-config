import webpack from 'webpack';

import buildDevServer from './buildDevServer';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import {IWebpackOptions} from './types/types';
import configDotenv from './utils/configDotenv';

export function buildWebpack(options: IWebpackOptions): webpack.Configuration {
    const isDev = options.mode === 'development';

    const baseUrl = options.paths.baseUrl
        ? String(options.paths.baseUrl).replace(/(^\/|\/$)/, '') + '/'
        : '';

    configDotenv(options);

    return {
        mode: options.mode,
        target: 'web',
        entry: options.paths.entry,
        output: {
            publicPath: `/${baseUrl}`,
            path: options.paths.output,
            filename: `bundle-[name]${options.useHash ? '.[contenthash]' : ''}.js`,
            chunkFilename: `bundle-[name]${options.useHash ? '.[contenthash]' : ''}.js`,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: buildLoaders(options),
        resolve: buildResolvers(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
        optimization: {
            concatenateModules: false,
            usedExports: false,
        },
    };
}
