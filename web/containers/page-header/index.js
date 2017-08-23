import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../../components/page-header';
import * as ACTIONS from '../../actions';

const PageHeaderContainer = (props) => (
  <PageHeader
    changeView={props.changeView}
    wideView={props.wideView}
    rightElem={props.rightElem}
    user={props.user} />
);

const mapStateToProps = (state) => ({
  user: state.user,
  wideView: state.app.wideView
});

const mapDispatchToProps = dispatch => ({
  changeView: (view) => dispatch(ACTIONS.changeView(view)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeaderContainer);

PageHeaderContainer.propTypes = {
  changeView: PropTypes.func.isRequired,
  wideView: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  rightElem: PropTypes.node
};

PageHeaderContainer.defaultProps = {};
