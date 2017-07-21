import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import RichEditor from '../../rich-editor';

const Education = (props) => (
  <div className="form-job-item" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. Delhi University"
        errorText={props.school.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter the school name"
        value={props.school.value}
        onChange={(e) => props.handleChange(e.target.value, 'school')}
        onBlur={(e) => props.handleChange(e.target.value, 'school')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. BTech"
        errorText={props.degree.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your degree obtained in this school"
        value={props.degree.value}
        onChange={(e) => props.handleChange(e.target.value, 'degree')}
        onBlur={(e) => props.handleChange(e.target.value, 'degree')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. Bengaluru, India"
        errorText={props.location.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter the location of this school"
        value={props.location.value}
        onChange={(e) => props.handleChange(e.target.value, 'location')}
        onBlur={(e) => props.handleChange(e.target.value, 'location')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. Computer Science"
        errorText={props.field.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your field of study"
        value={props.field.value}
        onChange={(e) => props.handleChange(e.target.value, 'field')}
        onBlur={(e) => props.handleChange(e.target.value, 'field')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 9.2"
        errorText={props.grade.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="Enter your grade achieved"
        value={props.grade.value}
        onChange={(e) => props.handleChange(e.target.value, 'grade')}
        onBlur={(e) => props.handleChange(e.target.value, 'grade')}
      />
      <Subheader label="Start Date" />
      <DatePicker
        hintText="30-01-2017"
        container="inline"
        className="input-date"
        autoOk={true}
        value={props.startdate.value}
        errorText={props.startdate.error}
        errorStyle={{bottom: '-4px'}}
        onChange={(e, date) => props.handleChange(date, 'startdate')}
        onBlur={(e, date) => props.handleChange(date, 'startdate')}
      />
      <Subheader label="End Date" />
      <DatePicker
        hintText="30-01-2017"
        container="inline"
        className="input-date"
        autoOk={true}
        value={props.enddate.value}
        errorText={props.enddate.error}
        errorStyle={{bottom: '-4px'}}
        onChange={(e, date) => props.handleChange(date, 'enddate')}
        onBlur={(e, date) => props.handleChange(date, 'enddate')}
      />
      <RichEditor
        editorState={props.description.value}
        placeholder="Enter other information here..."
        onChange={(e) => props.handleChange(e, 'description')} />
    </form>
  </div>
);

Education.propTypes = {
  school: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  degree: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  location: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  field: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  grade: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  startdate: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  enddate: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  description: PropTypes.shape({value: PropTypes.object, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

export default Education;
