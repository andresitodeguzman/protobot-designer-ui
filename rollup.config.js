import ejs from 'rollup-plugin-emit-ejs';
import resolve from 'rollup-plugin-node-resolve';
import html from 'rollup-plugin-html-minifier';
import stylus from 'rollup-plugin-stylus-compiler';
import css from 'rollup-plugin-css-porter';

const output = [];

output.push({
  input: './src/index.js',
  output: {
    file: './public/index.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    stylus(),
    css(),
    ejs({
      src: 'src',
      layout: 'src/layout/layout.html.ejs',
      options: {},
      data: {
        app: {},
        theme: {
          webApp: {}
        }
      }
    }),
    html()
  ]
});

export default output;
