import _ from 'lodash';
import {Configuration} from 'webpack-dev-server';

import {IWebpackOptions} from './types/types';

export default function buildDevServer(options: IWebpackOptions): Configuration {
    return {
        // static: {
        //     directory: options.paths.output,
        // },
        port: options.port ?? 9001,
        hot: true,
        open: false,
        // historyApiFallback: true,
        headers: {
            Host: options.host,
            'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: {
            index: '/' + _.trim(options.paths.baseUrl, '/') + '/index.html',
        },
        proxy: process.env.APP_BACKEND_URL
            ? [{
                context: ['/api', '/backend'],
                target: process.env.APP_BACKEND_URL,
                changeOrigin: true,
                secure: false,
            }]
            : undefined,
    };
}
