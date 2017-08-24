import React from 'react';
import PropTypes from 'prop-types';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Delete from 'material-ui/svg-icons/navigation/cancel';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';

import './small.less';

const FormList = (props) => (
  <li className="list" >
    <div className="actions" >
      <ArrowUp
        color='#888'
        onClick={props.moveUp}
        style={props.arrowUpStyle} />
      <ArrowDown
        color='#888'
        onClick={props.moveDown}
        style={props.arrowDownStyle} />
      <Delete
        color='#888'
        onClick={props.delete} />
    </div>
    <Card
      expanded={props.expanded}
      onExpandChange={props.toggle} >
      <CardHeader
        title={props.title}
        subtitle={'Click to expand'}
        actAsExpander={true} >
      </CardHeader>
      <CardText expandable={true}>
        {props.children}
      </CardText>
    </Card>
  </li>
);

FormList.propTypes = {
  moveUp: PropTypes.func.isRequired,
  arrowUpStyle: PropTypes.object.isRequired,
  moveDown: PropTypes.func.isRequired,
  arrowDownStyle: PropTypes.object.isRequired,
  delete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default FormList;
