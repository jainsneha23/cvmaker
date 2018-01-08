import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import './small.less';

const Skill = (props) => (
  <div className="form-skill-item" >
    <TextField
      fullWidth={true}
      errorText={props.skillCategory.error}
      errorStyle={{bottom: '-4px'}}
      floatingLabelText="技能类别"
      value={props.skillCategory.value}
      onChange={props.handleCategoryChange}
      onBlur={props.handleCategoryChange}
    />
    <ul>
      {props.list.map((item, i) =>
        <li key={i} className="skill-list">
          <Chip onRequestDelete={() => props.delete(i)} >
            {item}
          </Chip>
        </li>)}
    </ul>
    <form onSubmit={props.add}>
      <div className="inputDiv">
        <TextField
          autoComplete={false}
          fullWidth={true}
          hintText="Eg. Javascript"
          errorText={props.input.error}
          floatingLabelText="技能标签"
          value={props.input.value}
          onChange={props.handleInputChange}
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

Skill.propTypes = {
  skillCategory: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  input: PropTypes.object.isRequired,
  handleCategoryChange: PropTypes.func.isRequired
};

export default Skill;
