import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import FormList, {ListItem} from '../../components/form-list';
import Misc from '../../components/cvforms/misc';

const MiscContainer = (props) => (
  <FormList
    buttonLabel="Add More"
    add={props.add}>
    {props.list.map((item, i) =>
      <ListItem
        key={i}
        moveUp={() => props.move(i, 'up')}
        arrowUpStyle={{display: i === 0 ? 'none' : 'inline-block'}}
        moveDown={() => props.move(i, 'down')}
        arrowDownStyle={{display: i === props.list.length - 1 ? 'none' : 'inline-block'}}
        delete={() => props.delete(i)}
        title={item.label.value || 'Label'}
        expanded={i === props.expanded}
        toggle={() => props.toggle(i)}
      >
        <Misc
          label={item.label}
          description={item.description}
          handleChange={(val, type) => props.handleChange(i, type, val)}
        />
      </ListItem>
    )}
  </FormList>
);

const mapStateToProps = (state) => ({
  list: state.cvform.misc.list,
  expanded: state.cvform.misc.expanded
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(ACTIONS.addMiscGroup()),
  delete: (idx) => dispatch(ACTIONS.deleteMiscGroup(idx)),
  move: (idx, dir) => dispatch(ACTIONS.moveMiscGroup(idx, dir)),
  toggle: (idx) => dispatch(ACTIONS.toggleMiscGroup(idx)),
  handleChange: (idx, type, val) => dispatch(ACTIONS.handleMiscChange(idx, type, val))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiscContainer);

MiscContainer.propTypes = {
  list: PropTypes.array.isRequired,
  expanded: PropTypes.number.isRequired,
  add: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

MiscContainer.defaultProps = {};
