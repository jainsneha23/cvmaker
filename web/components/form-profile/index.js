import React from 'react';
import Subheader from 'material-ui/Subheader';
import RichEditor from '../rich-editor';
import {EditorState} from 'draft-js';
import './small.less';

class FormProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: EditorState.createEmpty(),
      objectives: EditorState.createEmpty()
    };
    this.handleChange  =this.handleChange.bind(this);
  }

  handleChange(editorState, property) {
    const newState = this.state;
    newState[property] = editorState;
    this.setState(newState);
    this.props.onChange({...newState});
  }

  render() {
    return (
      <div className="form-profile form-section" >
        <form>
          <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Profile Summary</Subheader>
          <RichEditor
            editorState={this.state.summary}
            placeholder="Enter your profile summary here..."
            onChange={(e) => this.handleChange(e, 'summary')} />
          <Subheader style={{paddingLeft: 0, fontWeight: 'bold'}}>Objectives</Subheader>
          <RichEditor
            editorState={this.state.objectives}
            placeholder="Enter your objectives here..."
            onChange={(e) => this.handleChange(e, 'objectives')} />
        </form>
      </div>
    );
  }
}

FormProfile.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FormProfile;
