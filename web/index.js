import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import { Router, browserHistory, RouterContext } from 'react-router';

import {jsonToHtml} from './utils/parse-cvform';
import {ResumeService} from './api';
import configureStore from './store/configureStore';
import * as ACTIONS from './actions';
import Routes from './routes';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.reduxStore = configureStore(props.preloadedState);
    this.reduxStore.dispatch(ACTIONS.initState());
    const state = this.reduxStore.getState();
    if (state.user.isNew)
      ResumeService.add(state.user, 1, jsonToHtml(state.cvform), state.template.id, state.template.color);
  }

  componentDidMount() {
    this.unlisten = browserHistory.listen(location => 
      this.reduxStore.dispatch(ACTIONS.firePageChange(location.action, location.pathname))
    );
  }

  componentWillUnmount() {
    this.unlisten();
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
  preloadedState: PropTypes.object.isRequired
};

export default Page;
