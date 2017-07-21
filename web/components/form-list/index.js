import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
export {default as ListItem} from './list-item';

import './small.less';

const FormList = (props) => (
  <div className="form-group form-section" >
    <ul>
      {props.children}
    </ul>
    <RaisedButton
      primary={true}
      label={props.buttonLabel}
      fullWidth={true}
      onClick={props.add} />
  </div>
);

FormList.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  add: PropTypes.func.isRequired
};

export default FormList;
