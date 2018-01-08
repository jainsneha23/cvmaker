import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import FormList, {ListItem} from '../../components/form-list';
import Job from '../../components/cvforms/job';

const JobContainer = (props) => (
  <FormList
    buttonLabel="添加工作经验"
    add={props.add}>
    {props.list.map((item, i) =>
      <ListItem
        key={i}
        moveUp={() => props.move(i, 'up')}
        arrowUpStyle={{display: i === 0 ? 'none' : 'inline-block'}}
        moveDown={() => props.move(i, 'down')}
        arrowDownStyle={{display: i === props.list.length - 1 ? 'none' : 'inline-block'}}
        delete={() => props.delete(i)}
        title={item.company.value || '公司'}
        expanded={i === props.expanded}
        toggle={() => props.toggle(i)}
      >
        <Job
          {...item}
          handleChange={(val, type) => props.handleChange(i, type, val)}
        />
      </ListItem>
    )}
  </FormList>
);

const mapStateToProps = (state) => ({
  list: state.cvform.job.list,
  expanded: state.cvform.job.expanded
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(ACTIONS.addJobGroup()),
  delete: (idx) => dispatch(ACTIONS.deleteJobGroup(idx)),
  move: (idx, dir) => dispatch(ACTIONS.moveJobGroup(idx, dir)),
  toggle: (idx) => dispatch(ACTIONS.toggleJobGroup(idx)),
  handleChange: (idx, type, val) => dispatch(ACTIONS.handleJobChange(idx, type, val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobContainer);

JobContainer.propTypes = {
  list: PropTypes.array.isRequired,
  expanded: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

JobContainer.defaultProps = {};
