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

const generatePDF = ({html, filename, filePath}, promise) => {
  module = promise;
  try {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setContent(html);
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true
      });
      browser.close();
      module.resolve({ filename, base64: getBase64String(filePath) });
      fs.unlink(filePath);
    })();
  } catch (exception) {
    module.reject(exception);
  }
};

export const generateComponentAsPDF = ({ html, filename, filePath }) => {
  return new Promise((resolve, reject) => {
    return generatePDF({ html, filename, filePath }, { resolve, reject });
  });
};