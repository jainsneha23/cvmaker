import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { base64ToBlob } from '../utils/base64-to-blob.js';

promise.polyfill();

class ResumeService {

  static add(user, resumeid, cvdata, designid, designcolor) {
    cvdata = JSON.stringify(JSON.stringify(cvdata));
    const design = JSON.stringify(JSON.stringify({id: designid, color: designcolor}));
    var query = `mutation { add (id: "${user.id}_${resumeid}", userid: ${user.id}, resumeid: ${resumeid}, cvdata: ${cvdata}, design: ${design}) { id } }`;
    return new Promise((resolve) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then(data => resolve(data))
        .catch(() => {
          if(localStorage){
            localStorage.setItem('cvdata', cvdata);
            localStorage.setItem('design', design);
          }
          resolve({});
        });
    });
  }

  static get(user) {
    if (!user) {
      return new Promise((resolve) => {
        let cvdata = (localStorage && localStorage.getItem('cvdata'));
        resolve((cvdata && JSON.parse(cvdata)) || {});
      });
    }
    var query = `query { resumes (userid: ${user.id}) { id, resumeid, cvdata, design } }`;
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
    cvdata = JSON.stringify(JSON.stringify(cvdata));
    localStorage && localStorage.setItem('cvdata', cvdata);
    if (!user) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    return new Promise((resolve, reject) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", cvdata: ${cvdata}) { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(() => resolve())
        .catch((e) => reject(e));
    });
  }

  static updateDesign(user, resumeid, designid, designcolor) {
    const design = JSON.stringify(JSON.stringify({id: designid, color: designcolor}));
    localStorage && localStorage.setItem('design', design);
    if (!user) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    return new Promise((resolve, reject) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", design: ${design}) { id } }`;
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
