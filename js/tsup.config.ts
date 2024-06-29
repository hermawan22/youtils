import type { Options } from 'tsup';

const env = process.env.NODE_ENV;

export const tsup: Options = {
  splitting: true,
  sourcemap: env === 'prod',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: env === 'production',
  bundle: env === 'production',
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: env === 'development',
  target: 'es2020',
  outDir: env === 'production' ? 'dist' : 'lib',
  entry: ['src/**/*.ts'],
};