import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import RichEditor from '../../rich-editor';
import DatePicker from '../../basic/date-picker';

const Job = (props) => (
  <div className="form-job-item" >
    <form>
      <TextField
        fullWidth={true}
        hintText="Eg. 美团点评"
        errorText={props.company.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="公司名称"
        value={props.company.value}
        onChange={(e) => props.handleChange(e.target.value, 'company')}
        onBlur={(e) => props.handleChange(e.target.value, 'company')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 算法开发"
        errorText={props.jobtitle.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="职位名称"
        value={props.jobtitle.value}
        onChange={(e) => props.handleChange(e.target.value, 'jobtitle')}
        onBlur={(e) => props.handleChange(e.target.value, 'jobtitle')}
      />
      <TextField
        fullWidth={true}
        hintText="Eg. 北京"
        errorText={props.location.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="公司地点"
        value={props.location.value}
        onChange={(e) => props.handleChange(e.target.value, 'location')}
        onBlur={(e) => props.handleChange(e.target.value, 'location')}
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
        disabled={props.currentjob.value}
        onChange={(date) => props.handleChange(date, 'enddate')}
      />
      <Toggle
        style={{marginTop: '10px'}}
        label="至今"
        labelPosition="right"
        className="input-toggle"
        toggled={props.currentjob.value}
        onToggle={(e, data) => {
          props.handleChange(data, 'currentjob');
          props.handleChange('Present', 'enddate');
        }}
      />
      <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>我的职责</Subheader>
      <RichEditor
        editorState={props.responsibilities.value}
        placeholder="担任的角色和职责..."
        onChange={(e) => props.handleChange(e, 'responsibilities')} />
    </form>
  </div>
);

Job.propTypes = {
  company: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  jobtitle: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  location: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  startdate: PropTypes.shape({value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), error: PropTypes.string}),
  enddate: PropTypes.shape({value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), error: PropTypes.string}),
  currentjob: PropTypes.shape({value: PropTypes.bool}),
  responsibilities: PropTypes.shape({value: PropTypes.object, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

export default Job;
