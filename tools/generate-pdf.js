import pdf from 'html-pdf';
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
  try {
    pdf.create(html, {
      format: 'A4'
    }).toFile(path.join(__dirname,`../pdf/${filename}.pdf`), (error, response) => {
      if (error) {
        module.reject(error);
      } else {
        module.resolve({ filename, base64: getBase64String(response.filename) });
        fs.unlink(response.filename);
      }
    });
  } catch (exception) {
    module.reject(exception);
  }
};

export const generateComponentAsPDF = ({ html, filename }) => {
  return new Promise((resolve, reject) => {
    return generatePDF({ html, filename }, { resolve, reject });
  });
};