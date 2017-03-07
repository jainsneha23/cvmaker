import React from 'react';
import TextField from 'material-ui/TextField';
import RichEditor from '../rich-editor';
import './small.less';

class FormOthersItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.item;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val, property) {
    const newState = this.state;
    newState[property].value = val;
    newState[property].error = val? '' : 'This field is required';
    this.setState(newState);
    this.props.onChange(newState);
  }

  render() {
    return (
      <div className="form-job-item" >
        <form>
          <TextField
            fullWidth={true}
            errorText={this.state.label.error}
            floatingLabelText="Enter the label for this paragraph"
            value={this.state.label.value}
            onChange={(e) => this.handleChange(e.target.value, 'label')}
            onBlur={(e) => this.handleChange(e.target.value, 'label')}
          />
          <RichEditor
            editorState={this.state.description}
            placeholder="Enter other information here..."
            onChange={(e) => this.handleChange(e, 'description')} />
        </form>
      </div>
    );
  }
}

FormOthersItem.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired
};

export default FormOthersItem;
