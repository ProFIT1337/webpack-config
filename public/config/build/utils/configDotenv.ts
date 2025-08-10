import {IWebpackOptions} from '../types/types';

import fs from 'fs';
import path from 'path';

export default function configDotenv(options: IWebpackOptions) {
    if (fs.existsSync(path.resolve(options.paths.cwd, '.env'))) {
        require('dotenv').config({
            path: path.resolve(options.paths.cwd, '.env'),
        });
    } else if (fs.existsSync(path.resolve(options.paths.cwd, '.example.env'))) {
        throw new Error('Not found .env file, is required for this project! Copy ".example.env" to ".env" and configure it.');
    }
}
