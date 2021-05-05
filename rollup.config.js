import typescript from '@rollup/plugin-typescript'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'

const plugins = [
  typescript(),
  resolve(),
  commonjs(),
  babel({
    runtimeHelpers: true,
    sourceMap: true,
    // https://github.com/rollup/rollup-plugin-babel/issues/260#issuecomment-429085745
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
    exclude: /(node_modules)/
  })
];

export default [
  {
    input: './src/index.ts',
    output: {
      sourcemap: false,
      exports: 'named',
      dir: './dist/',
      format: 'esm'
    },
    plugins,
    preserveModules: true
  }
]