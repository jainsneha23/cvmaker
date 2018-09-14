import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { base64ToBlob } from '../utils/base64-to-blob.js';

promise.polyfill();

class ResumeService {

  static add(user, resumeid, cvdata, templateid, templatecolor) {
    const template = JSON.stringify(JSON.stringify({id: templateid, color: templatecolor}));
    var query = `mutation { add (id: "${user.id}_${resumeid}", userid: ${user.id}, resumeid: ${resumeid}, cvdata: ${JSON.stringify(JSON.stringify(cvdata))}, template: ${template}) { id } }`;
    return new Promise((resolve) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then((data) => {
          if (data.errors) throw data.errors;
          else resolve({});
        }).catch((err) => {
          window.sendErr('ResumeService add err', err);
          resolve({});
        });
    });
  }

  static get(user) {
    var query = `query { resumes (userid: ${user.id}) { id, resumeid, cvdata, template } }`;
    return new Promise((resolve) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then((data) => {
          if (data.errors) throw data.errors;
          else resolve(data);
        }).catch((err) => {
          window.sendErr('ResumeService get err:', err);
          resolve({data: {resumes: []}});
        });
    });
  }

  static update(user, resumeid, cvdata) {
    return new Promise((resolve) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", cvdata: ${JSON.stringify(JSON.stringify(cvdata))}) { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then((res) => {
          if (res.errors) throw res.errors;
          else resolve();
        }).catch((err) => {
          window.sendErr('ResumeService update err:', err);
          resolve();
        });
    });
  }

  static updateTemplate(user, resumeid, templateid, templatecolor) {
    const template = JSON.stringify(JSON.stringify({id: templateid, color: templatecolor}));
    return new Promise((resolve) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", template: ${template}) { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(data => data.json())
        .then((res) => {
          if (res.errors) throw res.errors;
          else resolve();
        }).catch((err) => {
          window.sendErr('ResumeService update template err:', err);
          resolve();
        });
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
        else throw 'Error in fetching resume';
      }).then((response) => {
        const blob = base64ToBlob(response.content);
        fileSaver.saveAs(blob, 'resume.pdf');
        resolve();
      }).catch((err) => {
        window.sendErr('ResumeService download err:', err);
        reject(err);
      });
    });
  }
}

export default ResumeService;
