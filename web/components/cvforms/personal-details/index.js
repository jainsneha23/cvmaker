import React from 'react';
import PropTypes from 'prop-types'; 
import TextField from 'material-ui/TextField';

const PersonalDetails = (props) => (
  <div className="form-personal form-section" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. 杨孝辉"
        errorText={props.fullname.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="全名"
        value={props.fullname.value}
        onChange={(e) => props.handleChange(e, 'fullname')}
        onBlur={(e) => props.handleChange(e, 'fullname')}
        required
        name="fullname"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 算法开发"
        errorText={props.jobtitle.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="职位名称"
        value={props.jobtitle.value}
        onChange={(e) => props.handleChange(e, 'jobtitle')}
        onBlur={(e) => props.handleChange(e, 'jobtitle')}
        required
        name="jobtitle"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 4.5"
        errorText={props.experience.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="工作年份"
        value={props.experience.value}
        onChange={(e) => props.handleChange(e, 'experience')}
        onBlur={(e) => props.handleChange(e, 'experience')}
        name="experience"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. semsevens@gmail.com"
        errorText={props.email.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="邮箱地址"
        value={props.email.value}
        onChange={(e) => props.handleChange(e, 'email')}
        onBlur={(e) => props.handleChange(e, 'email')}
        required
        name="email"
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 18812345678"
        errorText={props.mobile.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="联系电话"
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
