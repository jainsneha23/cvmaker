import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { base64ToBlob } from '../utils/base64-to-blob.js';

promise.polyfill();

class ResumeService {

  static get(user) {
    var query = `query { resumes (userid: ${user.id}) { id, resumeid, cvdata } }`;
    return new Promise((resolve) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then(data => resolve(data))
        .catch(() => {
          let cvdata = (localStorage && localStorage.getItem('cvdata'));
          resolve((cvdata && JSON.parse(cvdata)) || {});
        });
    });
  }

  static update(user, resumeid, cvdata) {
    localStorage && localStorage.setItem('cvdata', JSON.stringify(cvdata));
    return new Promise((resolve, reject) => {
      var query = `mutation { update (id: ${user.id}_${resumeid}, userid: ${user.id}, resumeId: ${resumeid}, cvdata: "${JSON.stringify(cvdata)}") { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(() => resolve())
      .catch((e) => reject(e));
    });
  }

  static download(data) {
    return new Promise((resolve, reject) => {
      fetch('/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then((res) => {
        if (res.ok)
          return res.json();
        else throw Error({message: 'Error in fetching resume'});
      }).then((response) => {
        const blob = base64ToBlob(response.base64);
        fileSaver.saveAs(blob, 'resume.pdf');
        resolve();
      }).catch(e => reject(e));
    });
  }
}

export default ResumeService;
