import crypto from 'crypto';

const key = process.env.cryptoKey;
const nonce = process.env.cryptoNonce;

const encrypt = (text) => {
  const cipher = crypto.createCipheriv('aes256', key, nonce);
  let ciphertext = cipher.update(text, 'utf8', 'hex');
  ciphertext += cipher.final('hex');
  return ciphertext;
};

const decrypt = (ciphertext) => {
  const decipher = crypto.createDecipheriv('aes256', key, nonce);
  let plainText = decipher.update(ciphertext, 'hex', 'utf8');
  plainText += decipher.final('utf8');
  return plainText;
};

export {encrypt, decrypt};
