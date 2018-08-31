import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../../components/page-header';
import * as ACTIONS from '../../actions';

const PageHeaderContainer = (props) => (
  <PageHeader
    changeView={props.changeView}
    rightElem={props.rightElem}
    user={props.user}
    mobileView={props.mobileView} />
);

const mapStateToProps = (state) => ({
  user: state.user,
  mobileView: state.app.mobileView
});

const mapDispatchToProps = dispatch => ({
  changeView: (view) => dispatch(ACTIONS.changeView(view)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeaderContainer);

PageHeaderContainer.propTypes = {
  mobileView: PropTypes.bool.isRequired,
  changeView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  rightElem: PropTypes.node
};

PageHeaderContainer.defaultProps = {};
