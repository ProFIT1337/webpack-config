import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import {IWebpackOptions} from './types/types';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

export default function buildPlugins(options: IWebpackOptions): webpack.WebpackPluginInstance[] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';

    const plugins: webpack.WebpackPluginInstance[] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
          }),
    ];

    if (isDev) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(), 
            new ReactRefreshWebpackPlugin(),
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        )
    }
    
    if (options.bundleAnalyzer) {
        plugins.push(
            new BundleAnalyzerPlugin(),
        );
    }

    return plugins;
}