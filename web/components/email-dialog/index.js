import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import {ResumeService} from '../../api';
import {jsonToHtml} from '../../utils/parse-cvform';
import * as ACTIONS from '../../actions';

import './small.less';

class EmailDialog extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      fullname: {value: '', error: ''},
      email: {value: '', error: ''},
      message: {value: '', error: ''},
      emailing: false,
      emailError: null,
      emailSucess: false
    };
    this.resumeService = new ResumeService();
    this.email = this.email.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  email() {
    ['fullname', 'email', 'message'].forEach((property) => {
      if (!this.state[property].value)
        this.handleFormChange({target: {value: '', required: true}}, property);
    });
    if (this.state.fullname.error || this.state.email.error || this.state.message.error) {
      return;
    }
    this.props.fireButtonClick('email');
    this.setState({emailing: true});
    const data = JSON.stringify({
      cvdata: this.props.cvdata,
      templateId: this.props.templateId,
      templateColor: this.props.templateColor,
      email: {
        email: this.state.email.value,
        fullname: this.state.fullname.value,
        message: this.state.message.value
      }
    });
    this.resumeService.updateTemplate(this.props.user, 1, this.props.templateId, this.props.templateColor)
      .then(() => this.resumeService.email(data))
      .then(() => {
        this.setState({
          fullname: {value: '', error: ''},
          email: {value: '', error: ''},
          message: {value: '', error: ''},
          emailing: false,
          emailError: null,
          emailSucess: true
        });
        this.props.toggle();
      }).catch(() => {
        this.setState({emailing: false, emailError: 'An error occured. please try again'});
      });
  }

  handleClose() {
    this.setState({emailSucess: false});
  }

  handleFormChange(e, property) {
    const newState = {...this.state};
    if (!newState[property]) newState[property] = {};
    newState[property].value = e.target.value;
    newState[property].error = e.target.required && !e.target.value ? 'This field is required' : '';
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Dialog
          title="Email Resume"
          className="email-dialog"
          contentStyle={{width: '90%'}}
          actionsContainerStyle={{marginTop: 0}}
          titleClassName="title"
          actions={[<RaisedButton
            label="Close"
            primary={false}
            onTouchTap={this.props.toggle}
          />, <RaisedButton
            style={{marginLeft: 16}}
            label={this.state.emailing ? 'Sending email ...' : 'Send Mail'}
            primary={true}
            onTouchTap={this.email}
          />]}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.props.toggle} >
          <div>
            <p className="error">{this.state.emailError}</p>
            <form className="email-form">
              <TextField
                fullWidth={true}
                hintText="Eg. Sneha Jain"
                errorText={this.state.fullname.error}
                errorStyle={{bottom: '-4px'}}
                floatingLabelText="Enter your full name"
                value={this.state.fullname.value}
                onChange={(e) => this.handleFormChange(e, 'fullname')}
                onBlur={(e) => this.handleFormChange(e, 'fullname')}
                required
                name="fullname"
              />
              <TextField
                fullWidth={true}
                hintText="Eg. birdie.sneha@gmail.com"
                errorText={this.state.email.error}
                errorStyle={{bottom: '-4px'}}
                floatingLabelText="Enter the email address of the receiver"
                value={this.state.email.value}
                onChange={(e) => this.handleFormChange(e, 'email')}
                onBlur={(e) => this.handleFormChange(e, 'email')}
                required
                name="email"
                type="email"
              />
              <TextField
                floatingLabelText="Enter your message"
                errorText={this.state.message.error}
                errorStyle={{bottom: '-4px'}}
                value={this.state.message.value}
                onChange={(e) => this.handleFormChange(e, 'message')}
                onBlur={(e) => this.handleFormChange(e, 'message')}
                fullWidth={true}
                multiLine={true}
                rows={2}
                name="message"
                required
              />
            </form>
          </div>
        </Dialog>
        <Dialog
          actions={<RaisedButton
            label="OK"
            primary={true}
            onTouchTap={this.handleClose}
          />}
          modal={false}
          open={this.state.emailSucess}
          onRequestClose={this.handleClose}
        >
          Email sent successfully.
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cvdata: jsonToHtml(state.cvform),
  user: state.user,
  templateId: state.template.id,
  templateColor: state.template.color,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  fireButtonClick: (buttonName) => dispatch(ACTIONS.fireButtonClick(buttonName))
});

EmailDialog.propTypes = {
  fireButtonClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  cvdata: PropTypes.object.isRequired,
  templateId: PropTypes.number.isRequired,
  templateColor: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDialog));
