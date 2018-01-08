import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RichEditor from '../../rich-editor';

const Misc = (props) => (
  <div className="form-job-item" >
    <form>
      <TextField
        fullWidth={true}
        errorText={props.label.error}
        errorStyle={{bottom: '-4px'}}
        floatingLabelText="段落标签"
        value={props.label.value}
        onChange={(e) => props.handleChange(e.target.value, 'label')}
        onBlur={(e) => props.handleChange(e.target.value, 'label')}
      />
      <RichEditor
        editorState={props.description.value}
        placeholder="描述"
        onChange={(e) => props.handleChange(e, 'description')} />
    </form>
  </div>
);

Misc.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired
};

export default Misc;
