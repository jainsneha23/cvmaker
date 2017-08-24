import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { Router, browserHistory, RouterContext } from 'react-router';

import {jsonToHtml} from './utils/parse-cvform';
import {ResumeService} from './api';
import configureStore from './store/configureStore';
import Routes from './routes';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.reduxStore = configureStore(props.initialState);
    const state = this.reduxStore.getState();
    if (state.user.isNew)
      ResumeService.add(state.user, 1, jsonToHtml(state.cvform), state.design.id, state.design.color);
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
  initialState: PropTypes.object.isRequired
};

export default Page;
