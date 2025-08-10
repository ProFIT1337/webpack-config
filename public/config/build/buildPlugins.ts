import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import {IWebpackOptions} from './types/types';

import fs from 'fs';

export default function buildPlugins(options: IWebpackOptions): webpack.WebpackPluginInstance[] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const plugins: webpack.WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
        }),
        // .env
        fs.existsSync(options.paths.cwd + '/.env') && new Dotenv({
            path: options.paths.cwd + '/.env',
        }),
        // Proxy all APP_* env variables
        new webpack.DefinePlugin(Object.keys(process.env).reduce((obj, key) => {
            if (key.indexOf('APP_') === 0) {
                obj['process.env.' + key] = JSON.stringify(process.env[key]);
            }
            return obj;
        }, {
            'process.env.IS_WEB': JSON.stringify(true),
        })),
    ];

    if (isDev) {
        plugins.push(
            new ReactRefreshWebpackPlugin(),
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        );
    }

    if (options.bundleAnalyzer) {
        plugins.push(
            new BundleAnalyzerPlugin(),
        );
    }

    if (options.checkCircularImport) {
        plugins.push(new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
        }));
    }

    return plugins;
}
