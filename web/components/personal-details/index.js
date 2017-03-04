import React from 'react';
import TextField from 'material-ui/TextField';
import './small.less';

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: {
        value: '',
        dirty: false
      }
    };
    this.handleChange  =this.handleChange.bind(this);
  }

  handleChange(e, property) {
    const newState = this.state[property];
    newState.value = e.target.value;
    newState.dirty = true;
    this.setState(newState);
  }

  setDirty(e, property) {
    const newState = this.state[property];
    newState.dirty = true;
    this.setState(newState);
  }

  render() {
    return (
      <div className="personal-details">
        <form>
          <TextField
            hintText="Eg. Sneha Jain"
            {...this.state.fullname.dirty && !this.state.fullname.value ? {errorText: 'This field is required'} : {}}
            floatingLabelText="Enter your full name"
            value={this.state.fullname.value}
            onChange={(e) => this.handleChange(e, 'fullname')}
            onBlur={(e) => this.setDirty(e, 'fullname')}
          />
        </form>
      </div>
    );
  }
}

export default PersonalDetails;