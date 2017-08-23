import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import Profile from '../../components/cvforms/profile';

const ProfileContainer = (props) => (
  <Profile
    objectives={props.objectives}
    summary={props.summary}
    handleChange={props.handleChange}
  />
);

const mapStateToProps = (state) => ({
  objectives: state.cvform.profile.objectives.value,
  summary: state.cvform.profile.summary.value
});

const mapDispatchToProps = dispatch => ({
  handleChange: (e, type) => {
    dispatch(ACTIONS.changeProfile(e, type));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

ProfileContainer.propTypes = {
  objectives: PropTypes.object.isRequired,
  summary: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

ProfileContainer.defaultProps = {};
