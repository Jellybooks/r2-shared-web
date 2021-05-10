import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import multi from '@rollup/plugin-multi-entry';

const plugins = [
  typescript(),
  resolve(),
  commonjs(),
  multi(),
  babel({
    sourceMap: true,
    // https://github.com/rollup/rollup-plugin-babel/issues/260#issuecomment-429085745
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
    exclude: /(node_modules)/
  })
];

export default [
  {
    input: './src/**/*.ts',
    output: {
      sourcemap: false,
      exports: 'named',
      dir: './dist/',
      format: 'esm'
    },
    plugins
  }
];
