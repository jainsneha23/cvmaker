import React from 'react';
import fetch from 'isomorphic-fetch';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './small.less';

class FormFeedback extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      fullname: {value: '', error: ''},
      email: {value: '', error: ''},
      message: {value: '', error: ''}
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleChange  =this.handleChange.bind(this);
  }
  handleChange(e, property) {
    const newState = {...this.state};
    if (!newState[property]) newState[property] = {};
    newState[property].value = e.target.value;
    newState[property].error = e.target.required && !e.target.value ? 'This field is required' : '';
    this.setState(newState);
  }
  submitForm(event) {
    event.preventDefault();
    if (this.state.fullname.error || this.state.email.error || this.state.message.error) return;
    var postData = {
      fullname: this.state.fullname.value,
      email: this.state.email.value,
      message: this.state.message.value
    };
    fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then((data) => {
      if(data.ok){
        this.setState({
          fullname: {value: '', error: ''},
          email: {value: '', error: ''},
          message: {value: '', error: ''}
        });
        alert('Thanks for writing to Us.');
      } else alert('Error Occured.');
    }).catch(() => {
      alert('Error Occured.');
    });
  }
  render() {
    return (
      <form className="feedback-form">
        <TextField
          fullWidth={true}
          hintText="Eg. Sneha Jain"
          errorText={this.state.fullname.error}
          errorStyle={{bottom: '-4px'}}
          floatingLabelText="Enter your full name"
          value={this.state.fullname.value}
          onChange={(e) => this.handleChange(e, 'fullname')}
          onBlur={(e) => this.handleChange(e, 'fullname')}
          required
          name="fullname"
        />
        <TextField
          fullWidth={true}
          hintText="Eg. birdie.sneha@gmail.com"
          errorText={this.state.email.error}
          errorStyle={{bottom: '-4px'}}
          floatingLabelText="Enter your email address"
          value={this.state.email.value}
          onChange={(e) => this.handleChange(e, 'email')}
          onBlur={(e) => this.handleChange(e, 'email')}
          required
          name="email"
          type="email"
        />
        <TextField
          floatingLabelText="Enter your feedback"
          errorText={this.state.message.error}
          errorStyle={{bottom: '-4px'}}
          value={this.state.message.value}
          onChange={(e) => this.handleChange(e, 'message')}
          onBlur={(e) => this.handleChange(e, 'message')}
          fullWidth={true}
          multiLine={true}
          rows={2}
          name="message"
          required
        />
        <RaisedButton
          fullWidth={true}
          label="Submit"
          primary={true}
          onClick={this.submitForm}
          style={{marginTop: '12px'}}
        />
      </form>
    );
  }
}

export default FormFeedback;
