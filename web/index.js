import React from 'react';
import {Provider} from 'react-redux';
import { Router, browserHistory, RouterContext } from 'react-router';

import configureStore from './store/configureStore';
import Routes from './routes';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.reduxStore = configureStore(props.initialState);
  }

  render() {
    if (typeof window !== 'undefined') {
      return (
        <Provider store={this.reduxStore}>
          <Router history={browserHistory} routes={Routes} />
        </Provider>
      );
    }
    return (
      <Provider store={this.reduxStore}>
        <RouterContext {...this.props} />
      </Provider>
    );
  }
}

Page.propTypes = {
  initialState: React.PropTypes.object.isRequired
};

export default Page;
