import { Configuration } from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolves } from './buildResolves';
import { buildOptions } from './config';


export const buildWebpackConfig = (options: buildOptions): Configuration  => {

    const { paths, mode, isDev } = options;

    return {
        mode,
        entry: paths.entryPath,
        output: {
            path: paths.outputPath,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(),
        },
        resolve: buildResolves(),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined
    }
}