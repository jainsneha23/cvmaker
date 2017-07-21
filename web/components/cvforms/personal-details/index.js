import React from 'react';
import PropTypes from 'prop-types'; 
import TextField from 'material-ui/TextField';

const PersonalDetails = (props) => (
  <div className="form-personal form-section" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. Sneha Jain"
        errorText={props.fullname.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your full name"
        value={props.fullname.value}
        onChange={(e) => props.handleChange(e, 'fullname')}
        onBlur={(e) => props.handleChange(e, 'fullname')}
        required
        name="fullname"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. Software Engineer"
        errorText={props.jobtitle.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your job title"
        value={props.jobtitle.value}
        onChange={(e) => props.handleChange(e, 'jobtitle')}
        onBlur={(e) => props.handleChange(e, 'jobtitle')}
        required
        name="jobtitle"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 30"
        errorText={props.experience.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your experience in months"
        value={props.experience.value}
        onChange={(e) => props.handleChange(e, 'experience')}
        onBlur={(e) => props.handleChange(e, 'experience')}
        name="experience"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. birdie.sneha@gmail.com"
        errorText={props.email.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your email address"
        value={props.email.value}
        onChange={(e) => props.handleChange(e, 'email')}
        onBlur={(e) => props.handleChange(e, 'email')}
        required
        name="email"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 9876543210"
        errorText={props.mobile.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your mobile number"
        value={props.mobile.value}
        onChange={(e) => props.handleChange(e, 'mobile')}
        onBlur={(e) => props.handleChange(e, 'mobile')}
        required
        name="mobile"
      />
    </form>
  </div>
);

PersonalDetails.propTypes = {
  fullname: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  jobtitle: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  experience: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  email: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  mobile: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

export default PersonalDetails;
