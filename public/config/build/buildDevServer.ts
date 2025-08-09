import {Configuration} from "webpack-dev-server";
import {IWebpackOptions} from "./types/types";

export default function buildDevServer(options: IWebpackOptions): Configuration {
    return {
        port: options.port ?? 3000,
        hot: true,
        open: false,
        historyApiFallback: true,
      }
}