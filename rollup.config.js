import typescript from '@rollup/plugin-typescript'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import autoprefixer from 'autoprefixer'
import url from 'postcss-url'
import renameExtensions from '@betit/rollup-plugin-rename-extensions'

// 플러그인의 실행 순서에 따라 다른 결과가 발생할 수 있으므로 주의
const plugins = [
  typescript(),
  vue({
    // es5 코드로 추출되어야 하는데 node_modules 폴더는 babel 트랜스파일을 exclude 하므로 es5 코드로 맵핑
    // https://github.com/vuejs/rollup-plugin-vue/issues/262#issuecomment-562550886
    normalizer: '~vue-runtime-helpers/dist/normalize-component.js',
    styleInjector: '~vue-runtime-helpers/dist/inject-style/browser.js',

    style: {
      postcssPlugins: [
        autoprefixer(),
        url({ url: 'inline' })
      ]
    }
  }),
  resolve(),
  commonjs(),
  babel({
    runtimeHelpers: true, // 런타임 헬퍼 사용 (모듈로 같이 추출됨)
    sourceMap: true,
    // 트랜스파일 확장자 확장
    // https://github.com/rollup/rollup-plugin-babel/issues/260#issuecomment-429085745
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
    exclude: /(node_modules)/
  }),
  // preserveModules 모드는 원래의 폴더 및 파일 구조와 똑같이 output이 나오므로 ts, vue 파일을 js로 rename
  renameExtensions({
    include: ['**/*.ts', '**/*.vue'],
    mappings: { '.vue': '.vue.js', '.ts': '.js' }
  })
]

export default [
  // esm
  // https://medium.com/glovo-engineering/authoring-tree-shakeable-library-vuejs-sfc-typescript-cd1812f2a449
  {
    input: './src/index.ts',
    output: {
      sourcemap: true,
      exports: 'named', // https://github.com/rollup/rollup/issues/2106
      dir: './dist/esm',
      format: 'esm'
    },
    external: ['vue'],
    plugins,
    preserveModules: true // 모듈 번들링을 prevent 하고 모듈들의 구조 그대로 트랜스파일 되도록 설정 (It should not be bundled.)
  }
]