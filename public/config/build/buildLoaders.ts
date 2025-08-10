import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {ModuleOptions} from 'webpack';

import {IWebpackOptions} from './types/types';

export default function buildLoaders(options: IWebpackOptions): ModuleOptions {
    const isDev = options.mode === 'development';

    const tsxLoader = {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        modules: false,
                    }],
                    '@babel/preset-typescript',
                    ['@babel/preset-react', {runtime: 'automatic'}],
                ],
                plugins: [
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };

    const cssLoader = {
        test: /\.css$/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
        ],
    };
    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [
                            options.paths.sourcePath,
                        ],
                    },
                },
            },
        ],
    };

    const imagesLoader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    return {
        rules: [
            tsxLoader,
            scssLoader,
            cssLoader,
            imagesLoader,
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
        noParse: /crypto-pro-cadesplugin/,
    };
}
