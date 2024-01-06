import { Options, defineConfig } from 'tsup'

const baseConfig: Options = {
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  sourcemap: true,
  tsconfig: './tsconfig.json',
  platform: 'node'
};
const configCjs: Options = {
  ...baseConfig,
  format: 'cjs',
  outDir: 'dist/cjs'
};
const configEsm: Options = {
  ...baseConfig,
  format: 'esm',
  outDir: 'dist/esm'
};

export default defineConfig([configCjs, configEsm]);
