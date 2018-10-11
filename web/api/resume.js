import promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { base64ToBlob } from '../utils/base64-to-blob.js';

promise.polyfill();

class ResumeService {

  handleResponse(res) {
    return new Promise((resolve, reject) => {
      if (res.ok || res.status === 502) {
        res.json().then(data => {
          if (data.errors) reject(data.errors);
          else resolve(data.result);
        });
      } else reject(res.statusText);
    });
  }

  add(user, resumeid, cvdata, templateid, templatecolor, share) {
    const template = JSON.stringify(JSON.stringify({id: templateid, color: templatecolor}));
    var query = `mutation { add (id: "${user.id}_${resumeid}", userid: ${user.id}, resumeid: ${resumeid}, cvdata: ${JSON.stringify(JSON.stringify(cvdata))}, template: ${template}, share: ${JSON.stringify(JSON.stringify(share))}) { id } }`;
    return new Promise((resolve, reject) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(this.handleResponse)
        .then(() => resolve())
        .catch((err) => {
          window.sendErr(`ResumeService add err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  get(user) {
    var query = `query { resumes (userid: ${user.id}) { id, resumeid, cvdata, template, share } }`;
    return new Promise((resolve, reject) => {
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(this.handleResponse)
        .then((data) => resolve(data))
        .catch((err) => {
          window.sendErr(`ResumeService get err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  update(user, resumeid, cvdata) {
    return new Promise((resolve, reject) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", cvdata: ${JSON.stringify(JSON.stringify(cvdata))}) { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(this.handleResponse)
        .then(() => resolve())
        .catch((err) => {
          window.sendErr(`ResumeService update err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  updateTemplate(user, resumeid, templateid, templatecolor) {
    const template = JSON.stringify(JSON.stringify({id: templateid, color: templatecolor}));
    return new Promise((resolve, reject) => {
      var query = `mutation { update (id: "${user.id}_${resumeid}", template: ${template}) { id } }`;
      fetch('/api/resume', {
        method: 'POST',
        body: query
      }).then(this.handleResponse)
        .then(() => resolve())
        .catch((err) => {
          window.sendErr(`ResumeService updateTemplate err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  download(data) {
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
        else throw 'Error in downloading resume';
      }).then((response) => {
        const blob = base64ToBlob(response.content);
        fileSaver.saveAs(blob, 'resume.pdf');
        resolve();
      }).catch((err) => {
        window.sendErr(`ResumeService download err: ${JSON.stringify(err)}`);
        reject(err);
      });
    });
  }

  email(data) {
    return new Promise((resolve, reject) => {
      fetch('/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(this.handleResponse)
        .then(() => resolve())
        .catch((err) => {
          window.sendErr(`ResumeService email err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  share(data) {
    return new Promise((resolve, reject) => {
      fetch('/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(this.handleResponse)
        .then(({link}) => resolve(link))
        .catch((err) => {
          window.sendErr(`ResumeService share err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }

  stopShare(data) {
    return new Promise((resolve, reject) => {
      fetch('/stopshare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(this.handleResponse)
        .then(({link}) => resolve(link))
        .catch((err) => {
          window.sendErr(`ResumeService stop share err: ${JSON.stringify(err)}`);
          reject();
        });
    });
  }
}

export default ResumeService;
