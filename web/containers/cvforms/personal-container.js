import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ACTIONS from '../../actions';
import Personal from '../../components/cvforms/personal';

const PersonalContainer = (props) => (
  <Personal {...props} />
);

const mapStateToProps = (state) => ({
  fullname: state.cvform.personal.fullname,
  jobtitle: state.cvform.personal.jobtitle,
  experience: state.cvform.personal.experience,
  email: state.cvform.personal.email,
  mobile: state.cvform.personal.mobile,
  altmobile: state.cvform.personal.altmobile
});

const mapDispatchToProps = dispatch => ({
  handleChange: (e, type) => {
    dispatch(ACTIONS.changePersonal(e, type));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalContainer);

PersonalContainer.propTypes = {
  fullname: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  jobtitle: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  experience: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  email: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  mobile: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  altmobile: PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
  handleChange: PropTypes.func.isRequired
};

PersonalContainer.defaultProps = {};
