import fetch from 'isomorphic-fetch';

class Messager {
  constructor() {
    this.TILL_URL = process.env.TILL_URL;
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
