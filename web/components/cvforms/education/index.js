import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RichEditor from '../../rich-editor';
import DatePicker from '../../basic/date-picker';

const Education = (props) => (
  <div className="form-job-item" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. 北京化工大学"
        errorText={props.school.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="名称"
        value={props.school.value}
        onChange={(e) => props.handleChange(e.target.value, 'school')}
        onBlur={(e) => props.handleChange(e.target.value, 'school')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 本科"
        errorText={props.degree.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="学位"
        value={props.degree.value}
        onChange={(e) => props.handleChange(e.target.value, 'degree')}
        onBlur={(e) => props.handleChange(e.target.value, 'degree')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 北京a"
        errorText={props.location.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="地点"
        value={props.location.value}
        onChange={(e) => props.handleChange(e.target.value, 'location')}
        onBlur={(e) => props.handleChange(e.target.value, 'location')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 计算机科学与技术"
        errorText={props.field.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="专业"
        value={props.field.value}
        onChange={(e) => props.handleChange(e.target.value, 'field')}
        onBlur={(e) => props.handleChange(e.target.value, 'field')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 3.14"
        errorText={props.grade.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="GPA"
        value={props.grade.value}
        onChange={(e) => props.handleChange(e.target.value, 'grade')}
        onBlur={(e) => props.handleChange(e.target.value, 'grade')}
      />
      <DatePicker
        label="开始日期"
        value={props.startdate.value}
        errorText={props.startdate.error}
        onChange={(date) => props.handleChange(date, 'startdate')}
      />
      <DatePicker
        label="结束日期"
        value={props.enddate.value}
        errorText={props.enddate.error}
        onChange={(date) => props.handleChange(date, 'enddate')}
      />
      <RichEditor
        editorState={props.description.value}
        placeholder="其它描述..."
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
  startdate: PropTypes.shape({value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), error: PropTypes.string}),
  enddate: PropTypes.shape({value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), error: PropTypes.string}),
  description: PropTypes.shape({value: PropTypes.object, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

export default Education;
