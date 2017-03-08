import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Chip from 'material-ui/Chip';
import './small.less';

class FormSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: {},
      skillList: []
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, property) {
    const newState = {...this.state};
    newState[property].value = e.target.value;
    newState[property].error = e.target.value? '' : 'This field is required';
    this.setState(newState);
  }

  handleDelete(i) {
    const skillList = [...this.state.skillList];
    skillList.splice(i, 1);
    this.setState({skillList});
    this.props.onChange([...skillList]);
  }

  handleSubmit(e) {
    e.preventDefault();
    const skillList = [...this.state.skillList];
    if (skillList.indexOf(this.state.skill.value) === -1) {
      skillList.push(this.state.skill.value);
    }
    this.setState({skillList, skill: {value: '', error: ''}});
    this.props.onChange([...skillList]);
  }

  render() {
    return (
      <div className="form-skills form-section" >
        <form onSubmit={this.handleSubmit}>
          <div className="inputDiv">
            <TextField
              autoComplete={false}
              fullWidth={true}
              hintText="Eg. Javascript"
              errorText={this.state.skill.error}
              floatingLabelText="Enter the skill and tap enter"
              value={this.state.skill.value}
              onChange={(e) => this.handleChange(e, 'skill')}
              required
              name="skill"
            />
          </div>
          <FloatingActionButton mini={true} type="submit">
            <ContentAdd />
          </FloatingActionButton>
        </form>
        <div style={this.styles.wrapper}>
          {this.state.skillList.map((data, i) => (
            <Chip
              key={i}
              onRequestDelete={() => this.handleDelete(i)}
              style={this.styles.chip}>
              {data}
            </Chip>
          ))}
        </div>
      </div>
    );
  }
}

FormSkills.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FormSkills;