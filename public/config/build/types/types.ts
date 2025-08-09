export interface IPaths {
    entry: string,
    html: string,
    output: string,
}

export type BuildModeType = 'development' | 'production';

export interface IWebpackOptions {
    port: number,
    paths: IPaths,
    mode: BuildModeType,
    bundleAnalyzer?: boolean,
}