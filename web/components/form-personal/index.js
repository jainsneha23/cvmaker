import React from 'react';
import TextField from 'material-ui/TextField';
import './small.less';

class FormPersonal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: {},
      jobtitle: {},
      experience: {},
      email: {},
      mobile: {}
    };
    this.handleChange  =this.handleChange.bind(this);
  }

  handleChange(e, property) {
    const newState = {...this.state};
    newState[property].value = e.target.value;
    newState[property].error = e.target.required && !e.target.value ? 'This field is required' : '';
    this.setState(newState);
    this.props.onChange({...newState});
  }

  render() {
    return (
      <div className="form-personal form-section" >
        <form>
          <TextField
            fullWidth={true}
            hintText="Eg. Sneha Jain"
            errorText={this.state.fullname.error}
            floatingLabelText="Enter your full name"
            value={this.state.fullname.value}
            onChange={(e) => this.handleChange(e, 'fullname')}
            onBlur={(e) => this.handleChange(e, 'fullname')}
            required
            name="fullname"
          />
          <TextField
            fullWidth={true}
            hintText="Eg. Software Engineer"
            errorText={this.state.jobtitle.error}
            floatingLabelText="Enter your job title"
            value={this.state.jobtitle.value}
            onChange={(e) => this.handleChange(e, 'jobtitle')}
            onBlur={(e) => this.handleChange(e, 'jobtitle')}
            required
            name="jobtitle"
          />
          <TextField
            fullWidth={true}
            hintText="Eg. 30"
            errorText={this.state.experience.error}
            floatingLabelText="Enter your experience in months"
            value={this.state.experience.value}
            onChange={(e) => this.handleChange(e, 'experience')}
            onBlur={(e) => this.handleChange(e, 'experience')}
            name="experience"
          />
          <TextField
            fullWidth={true}
            hintText="Eg. birdie.sneha@gmail.com"
            errorText={this.state.email.error}
            floatingLabelText="Enter your email address"
            value={this.state.email.value}
            onChange={(e) => this.handleChange(e, 'email')}
            onBlur={(e) => this.handleChange(e, 'email')}
            required
            name="email"
          />
          <TextField
            fullWidth={true}
            hintText="Eg. 9876543210"
            errorText={this.state.mobile.error}
            floatingLabelText="Enter your mobile number"
            value={this.state.mobile.value}
            onChange={(e) => this.handleChange(e, 'mobile')}
            onBlur={(e) => this.handleChange(e, 'mobile')}
            required
            name="mobile"
          />
        </form>
      </div>
    );
  }
}

FormPersonal.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FormPersonal;
