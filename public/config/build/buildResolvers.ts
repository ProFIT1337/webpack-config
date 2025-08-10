import {ResolveOptions} from 'webpack';

import {IWebpackOptions} from './types/types';

import fs from 'fs';
import path from 'path';

export default function buildResolvers(options: IWebpackOptions): ResolveOptions {
    return {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            // Исправление ошибки @steroidsjs/core в package.json. Там указан неверный exports block
            '@steroidsjs/core': path.resolve(options.paths.cwd, 'node_modules/@steroidsjs/core'),

        //     app: path.resolve(options.paths.cwd, 'app'),
        //     reducers: fs.existsSync(path.resolve(options.paths.sourcePath, 'reducers'))
        //         ? path.resolve(options.paths.sourcePath, 'reducers')
        //         : '@steroidsjs/core/reducers',
        },
        modules: [
            options.paths.sourcePath,
            path.resolve(options.paths.cwd, 'node_modules'),
        ].filter(pathName => fs.existsSync(pathName)),
        symlinks: false,
        exportsFields: ['exports'],
    };
}
