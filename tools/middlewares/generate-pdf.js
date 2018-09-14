import puppeteer from 'puppeteer';
import fs from 'fs';

let module;

const getBase64String = (path) => {
  try {
    const file = fs.readFileSync(path);
    return new Buffer(file).toString('base64');
  } catch (exception) {
    module.reject(exception);
  }
};

const generate = ({html, filename, filePath}, promise) => {
  module = promise;
  try {
    (async () => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      page.setContent(html);
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true
      });
      browser.close();
      module.resolve({ filename, content: getBase64String(filePath) });
      fs.unlink(filePath);
    })();
  } catch (exception) {
    module.reject(exception);
  }
};

export const generatePDF = ({ html, filename, filePath }) => {
  return new Promise((resolve, reject) => {
    return generate({ html, filename, filePath }, { resolve, reject });
  });
};