import fetch from 'isomorphic-fetch';

class Messager {
  constructor() {
    this.TILL_URL = process.env.TILL_URL || 'https://platform.tillmobile.com/api/send?username=88d6777fb09743b1a818fc75a2d0a0&api_key=d0d3e5b3e3374fff79f0addb558b50c6a35545c4';
  }
  sendFeedback(obj) {
    return new Promise((resolve, reject) => {
      fetch(this.TILL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: ['+918105266097', '+919590716661'],
          text: `Feedback from ${obj.email}-${obj.fullname}: ${obj.message}`
        })
      }).then((res) => {
        console.log(res);
        resolve();
      }).catch(e => {
        console.log(e);
        reject(e);
      });
    });
  }
}

export default Messager;
