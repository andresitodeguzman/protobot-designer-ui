/**
 * Test
 * ejsTest
 */
const assert = require('assert');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

exec('npm run-script build', (err, stdout) => {
  if (err) console.log(err);
  /**
   * input
   * @return (String) src
   */
  const input = () => {
    // get index.ejs
    const c = fs.readFileSync(path.resolve(__dirname, '../src/index.html.ejs'), 'utf8');

    // prefill with sample data (replace if config file is available)
    const data = {
      app: {
        title: '',
        description: '',
        image: '',
        twitter: '',
        twitterCreator: '',
        baseHref: ''
      },
      theme: {
        favicon: '',
        themeColor: '',
        icons: [],
        webApp: {
          capable: '',
          tapHighlight: ''
        }
      },
      content: c
    };

    // get template ejs
    const tpl = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
    // return rendered ejs
    return ejs.render(tpl, data);
  };

  /**
   * output
   * @return (String) public
   */
  const output = () => {
    // return output file
    return fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
  };

  // Do the assertion
  try {
    assert.strictEqual(input(), output());
  } catch (e) {
    console.log(e.message);
  }
});
