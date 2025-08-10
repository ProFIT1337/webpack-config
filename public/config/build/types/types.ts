export interface IPaths {
    entry: string,
    html: string,
    output: string,
    sourcePath: string,
    cwd: string,
    static: '',
    baseUrl: string,
}

export type BuildModeType = 'development' | 'production';

export interface IWebpackOptions {
    host: string,
    port: number,
    paths: IPaths,
    mode: BuildModeType,
    bundleAnalyzer?: boolean,
    useHash: boolean,
    checkCircularImport?: boolean,
}
