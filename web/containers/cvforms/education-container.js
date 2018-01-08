import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import FormList, {ListItem} from '../../components/form-list';
import Education from '../../components/cvforms/education';

const EducationContainer = (props) => (
  <FormList
    buttonLabel="添加教育背景"
    add={props.add}>
    {props.list.map((item, i) =>
      <ListItem
        key={i}
        moveUp={() => props.move(i, 'up')}
        arrowUpStyle={{display: i === 0 ? 'none' : 'inline-block'}}
        moveDown={() => props.move(i, 'down')}
        arrowDownStyle={{display: i === props.list.length - 1 ? 'none' : 'inline-block'}}
        delete={() => props.delete(i)}
        title={item.degree.value || '学位'}
        expanded={i === props.expanded}
        toggle={() => props.toggle(i)}
      >
        <Education
          {...item}
          handleChange={(val, type) => props.handleChange(i, type, val)}
        />
      </ListItem>
    )}
  </FormList>
);

const mapStateToProps = (state) => ({
  list: state.cvform.education.list,
  expanded: state.cvform.education.expanded
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(ACTIONS.addEduGroup()),
  delete: (idx) => dispatch(ACTIONS.deleteEduGroup(idx)),
  move: (idx, dir) => dispatch(ACTIONS.moveEduGroup(idx, dir)),
  toggle: (idx) => dispatch(ACTIONS.toggleEduGroup(idx)),
  handleChange: (idx, type, val) => dispatch(ACTIONS.handleEduChange(idx, type, val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EducationContainer);

EducationContainer.propTypes = {
  list: PropTypes.array.isRequired,
  expanded: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

EducationContainer.defaultProps = {};
