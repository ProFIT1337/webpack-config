import {ModuleOptions} from "webpack";
import {IWebpackOptions} from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function buildLoaders(options: IWebpackOptions): ModuleOptions {
    const isDev = options.mode === 'development';

    const tsxLoader = {
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
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        // exclude: /node_modules/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
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
            imagesLoader
          ],
    }
}