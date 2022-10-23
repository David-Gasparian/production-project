import path from 'path';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { buildEnv, buildMode, buildPaths } from './config/build/config';

export default (env: buildEnv) => {

  const paths: buildPaths = {
    entryPath: path.resolve(__dirname, 'src', 'index.tsx'),
    outputPath: path.resolve(__dirname, 'build'),
    htmlPath: path.resolve(__dirname, 'public', 'index.html')
  }

  const mode: buildMode = env.mode || 'development';
  const isDev = mode === 'development';
  const PORT = env.port || 3000;

  const config = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });

  return config;
}