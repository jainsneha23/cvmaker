import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import FormList, {ListItem} from '../../components/form-list';
import Skill from '../../components/cvforms/skill';

const SkillContainer = (props) => (
  <FormList
    buttonLabel="添加技能类别"
    add={props.add}>
    {props.list.map((item, i) =>
      <ListItem
        key={i}
        moveUp={() => props.move(i, 'up')}
        arrowUpStyle={{display: i === 0 ? 'none' : 'inline-block'}}
        moveDown={() => props.move(i, 'down')}
        arrowDownStyle={{display: i === props.list.length - 1 ? 'none' : 'inline-block'}}
        delete={() => props.delete(i)}
        title={item.skillCategory.value || '技能类别'}
        expanded={i === props.expanded}
        toggle={() => props.toggle(i)}
      >
        <Skill
          skillCategory={item.skillCategory}
          input={item.input}
          list={item.skills}
          handleInputChange={(e) => props.handleSkillInputChange(e,i)}
          handleCategoryChange={(e) => props.handleSkillCategoryChange(e, i)}
          add={(e) => props.addSkill(e, i)}
          delete={(j) => props.deleteSkill(i, j)}
        />
      </ListItem>
    )}
  </FormList>
);

const mapStateToProps = (state) => ({
  list: state.cvform.skill.list,
  expanded: state.cvform.skill.expanded
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(ACTIONS.addSkillGroup()),
  delete: (idx) => dispatch(ACTIONS.deleteSkillGroup(idx)),
  move: (idx, dir) => dispatch(ACTIONS.moveSkillGroup(idx, dir)),
  toggle: (idx) => dispatch(ACTIONS.toggleSkillGroup(idx)),
  handleSkillInputChange: (e, i) => dispatch(ACTIONS.handleSkillInputChange(e, i)),
  handleSkillCategoryChange: (e, i) => dispatch(ACTIONS.handleSkillCategoryChange(e, i)),
  addSkill: (e, i) => {
    e.preventDefault();
    dispatch(ACTIONS.addSkill(i));
  },
  deleteSkill: (i, j) => dispatch(ACTIONS.deleteSkill(i, j))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillContainer);

SkillContainer.propTypes = {
  list: PropTypes.array.isRequired,
  expanded: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  handleSkillInputChange: PropTypes.func.isRequired,
  handleSkillCategoryChange: PropTypes.func.isRequired,
  addSkill: PropTypes.func.isRequired,
  deleteSkill: PropTypes.func.isRequired
};

SkillContainer.defaultProps = {};
