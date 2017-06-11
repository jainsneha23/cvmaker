import deasync from 'deasync';

const lessToCss = (src) => {
  let css;
  let running = true;
  var less = require('less');
  const path = require('path');
  const fs = require('fs');
  less.render(fs.readFileSync(src).toString(), {
    filename: path.resolve(src),
  }, (e, output) => {
    if (e) console.log(e);
    css = output.css;
    running = false;
  });
  while(running) {
    deasync.sleep(100);
  }
  return css;
};

export default lessToCss;
