import puppeteer from 'puppeteer';
import path from 'path';
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

const generatePDF = ({html, filename}, promise) => {
  module = promise;
  const file = path.join(__dirname,`../pdf/${filename}.pdf`);
  try {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      page.setContent(html);
      await page.pdf({
        path: file,
        format: 'A4',
        printBackground: true
      });
      browser.close();
      module.resolve({ filename, base64: getBase64String(file) });
      fs.unlink(file);
    })();
  } catch (exception) {
    module.reject(exception);
  }
};

export const generateComponentAsPDF = ({ html, filename }) => {
  return new Promise((resolve, reject) => {
    return generatePDF({ html, filename }, { resolve, reject });
  });
};