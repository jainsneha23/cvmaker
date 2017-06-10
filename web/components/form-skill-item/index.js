import React from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import './small.less';

class FormSkillItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      skill: {value: '', error: ''}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      skill: {
        value: e.target.value,
        error: !e.target.value && 'Please enter a skill'
      }});
  }

  handleRequestDelete(i) {
    const newState = {...this.state.item};
    newState.skills.splice(i, 1);
    this.setState({item: newState});
    this.props.onChange(newState);
  }

  handleChange(val, property) {
    const newState = {...this.state.item};
    newState[property].value = val;
    newState[property].error = val? '' : 'This field is required';
    if (property === 'skillCategory') newState.heading = val;
    this.setState({item: newState});
    this.props.onChange(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newState = {...this.state.item};
    if (newState.skills.indexOf(this.state.skill.value) === -1)
      newState.skills.push(this.state.skill.value);
    this.setState({item: newState});
    this.setState({skill: {value: '', error: ''}});
    this.props.onChange(newState);
  }

  render() {
    return (
      <div className="form-skill-item" >
        <TextField
          fullWidth={true}
          errorText={this.state.item.skillCategory.error}
          errorStyle={{bottom: '-4px'}}
          floatingLabelText="Enter the skill category"
          value={this.state.item.skillCategory.value}
          onChange={(e) => this.handleChange(e.target.value, 'skillCategory')}
          onBlur={(e) => this.handleChange(e.target.value, 'skillCategory')}
        />
        <ul>
        {this.state.item.skills.map((skill, i) =>
          <li key={i} className="skill-list">
            <Chip onRequestDelete={() => this.handleRequestDelete(i)} >
              {skill}
            </Chip>
          </li>)}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div className="inputDiv">
            <TextField
              autoComplete={false}
              fullWidth={true}
              hintText="Eg. Javascript"
              errorText={this.state.skill.error}
              floatingLabelText="Enter the skill and tap enter"
              value={this.state.skill.value}
              onChange={this.handleInputChange}
              required
              name="skill"
            />
          </div>
          <FloatingActionButton mini={true} type="submit">
            <ContentAdd />
          </FloatingActionButton>
        </form>
      </div>
    );
  }
}

FormSkillItem.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired
};

export default FormSkillItem;
