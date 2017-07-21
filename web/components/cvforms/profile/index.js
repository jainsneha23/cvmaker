import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import RichEditor from '../../rich-editor';

const Profile = (props) => (
  <div className="form-profile form-section" >
    <form>
      <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Objectives</Subheader>
      <RichEditor
        editorState={props.objectives}
        placeholder="Enter your objectives here..."
        onChange={(e) => this.handleChange(e, 'objectives')} />
      <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Profile Summary</Subheader>
      <RichEditor
        editorState={props.summary}
        placeholder="Enter your profile summary here..."
        onChange={(e) => this.handleChange(e, 'summary')} />
    </form>
  </div>
);

Profile.propTypes = {
  objectives: PropTypes.object.isRequired,
  summary: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Profile;
