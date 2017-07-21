import React from 'react';
/*
 *  @prop  loading(boolean): Set current loading state on parent component
 *  @prop  isFullOverlay(boolean): Is the indicator required on whole page or the first adjacent sibling container
 */
const LoadingIndicator = props => (
  <div className={`loading-indicator ${props.loading ? 'show' : ''} ${props.isFullOverlay ? 'full-page' : 'inside-container'}`} >
    <div className="loader" style={{height: props.text ? '116px' : '64px'}}>
      <div className="spinner" />
      <span className="text">{props.text}</span>
    </div>
  </div>
);

LoadingIndicator.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  isFullOverlay: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string
};

export default LoadingIndicator;
