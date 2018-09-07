import React from 'react';
import PropTypes from 'prop-types'; 
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const Personal = (props) => (
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
      <p style={{margin: '15px 0 -15px 0'}}>Enter your experience</p>
      <SelectField
        maxHeight={200}
        value={props.experience.value.years}
        floatingLabelText="Years"
        errorText={props.experience.error}
        onChange={(e, i, v) => props.handleExperienceChange(v, 'years')}
        onBlur={(e, i, v) => props.handleExperienceChange(v, 'years')}>
        {Array.from({length: 50}).map((v, i) => <MenuItem value={i} key={i} primaryText={`${i} year${i > 2 ? 's' : ''}`} />)}
      </SelectField>
      <SelectField
        maxHeight={200}
        value={props.experience.value.months}
        floatingLabelText="Months"
        onChange={(e, i, v) => props.handleExperienceChange(v, 'months')}
        onBlur={(e, i, v) => props.handleExperienceChange(v, 'months')}>
        {Array.from({length: 11}).map((v, i) => <MenuItem value={i} key={i} primaryText={`${i} month${i > 2 ? 's' : ''}`} />)}
      </SelectField>
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
      <TextField
        fullWidth={true}
        hintText="Eg. 9876543210"
        errorText={props.mobile.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your alternate mobile number"
        value={props.altmobile.value}
        onChange={(e) => props.handleChange(e, 'altmobile')}
        onBlur={(e) => props.handleChange(e, 'altmobile')}
        required
        name="altmobile"
      />
    </form>
  </div>
);

Personal.propTypes = {
  fullname: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  jobtitle: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  experience: PropTypes.shape({value: PropTypes.object, error: PropTypes.string}),
  email: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  mobile: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  altmobile: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired,
  handleExperienceChange: PropTypes.func.isRequired
};

export default Personal;
