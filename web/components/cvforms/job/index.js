import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import RichEditor from '../../rich-editor';

const Job = (props) => (
  <div className="form-job-item" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. Software services"
        errorText={props.company.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter the company name"
        value={props.company.value}
        onChange={(e) => props.handleChange(e.target.value, 'company')}
        onBlur={(e) => props.handleChange(e.target.value, 'company')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. Software Engineer"
        errorText={props.jobtitle.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your job title in this company"
        value={props.jobtitle.value}
        onChange={(e) => props.handleChange(e.target.value, 'jobtitle')}
        onBlur={(e) => props.handleChange(e.target.value, 'jobtitle')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. Bengaluru, India"
        errorText={props.location.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your job location for this company"
        value={props.location.value}
        onChange={(e) => props.handleChange(e.target.value, 'location')}
        onBlur={(e) => props.handleChange(e.target.value, 'location')}
      />
      <DatePicker
        hintText="30-01-2017"
        container="inline"
        autoOk={true}
        className="input-date"
        value={props.startdate.value || null}
        errorText={props.startdate.error}
        errorStyle={{bottom: '-4px'}}
        onChange={(e, date) => props.handleChange(date, 'startdate')}
        onBlur={(e, date) => props.handleChange(date, 'startdate')}
      />
      <DatePicker
        hintText="30-01-2017"
        container="inline"
        autoOk={true}
        className="input-date"
        value={props.enddate.value || null}
        errorText={props.enddate.error}
        errorStyle={{bottom: '-4px'}}
        onChange={(e, date) => props.handleChange(date, 'enddate')}
        onBlur={(e, date) => props.handleChange(date, 'enddate')}
        disabled={props.currentjob.value}
      />
      <Toggle
        label="I currently work here"
        labelPosition="right"
        className="input-toggle"
        toggled={props.currentjob.value}
        onToggle={(e, data) => props.handleChange(data, 'currentjob')}
      />
      <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Roles and Responsibilities</Subheader>
      <RichEditor
        editorState={props.responsibilities.value}
        placeholder="Enter your roles and responsibilities here..."
        onChange={(e) => props.handleChange(e, 'responsibilities')} />
    </form>
  </div>
);

Job.propTypes = {
  company: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  jobtitle: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  location: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  startdate: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  enddate: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  currentjob: PropTypes.shape({value: PropTypes.bool, error: PropTypes.string}),
  responsibilities: PropTypes.shape({value: PropTypes.object, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

export default Job;
