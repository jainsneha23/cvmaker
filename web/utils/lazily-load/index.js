import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable no-underscore-dangle */
class LazilyLoad extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();
  }

  componentDidUpdate(previous) {
    const shouldLoad = !!Object.keys(this.props.modules).filter(key => (
      this.props.modules[key] !== previous.modules[key]
    )).length;
    if (shouldLoad) {
      this.load();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load() {
    this.setState({
      isLoaded: false,
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map(key => modules[key]()))
      .then(values => (keys.reduce((agg, key, index) => {
        agg[key] = values[index];
        return agg;
      }, {})))
      .then((result) => {
        if (!this._isMounted) return null;
        return this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (typeof window !== 'undefined') {
      if (!this.state.isLoaded) return this.props.loadingComponent;
      return React.Children.only(this.props.children(this.state.modules));
    }
    const { modules } = this.props;
    const keys = Object.keys(modules);
    const components = keys.map(key => modules[key]());
    const result = keys.reduce((agg, key, index) => {
      agg[key] = components[index];
      return agg;
    }, {});
    return React.Children.only(this.props.children(result));
  }
}

LazilyLoad.propTypes = {
  children: PropTypes.func.isRequired,
  modules: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object
  ]),
  loadingComponent: PropTypes.node
};

const importLazy = promise => (promise.then && promise.then(result => result.default)) || promise.default;

export {LazilyLoad, importLazy};
