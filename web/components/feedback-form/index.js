import React from 'react';
import fetch from 'isomorphic-fetch';
import './small.less';

class FeedbackForm extends React.Component{
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(event) {
    event.preventDefault();
    var postData = {
      username: this.form.username.value,
      email: this.form.email.value,
      message: this.form.message.value
    };
    fetch('http://localhost:8888/phpservice/feedback.php', {
      method: 'POST',
      body: JSON.stringify(postData)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      if(data.status == 'Success'){
        this.form.username.value = '';
        this.form.email.value = '';
        this.form.message.value = '';
        alert('Thanks for writing to Us.');
      }else alert('Error Occured.');
    }).catch(() => {
      alert('Error Occured.');
    });
  }
  render() {
    return (
      <form className="feedback-form" ref={(form) => { this.form = form; }} >
        <label>Name: <input name="username" type="text" required/></label>
        <label>Email ID: <input name="email" type="email" required/></label>
        <label>Message: <textarea name="message"></textarea></label>
        <input type="submit" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default FeedbackForm;