import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/card';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui/svg-icons/navigation/cancel';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';

import FormSkillItem from '../form-skill-item';
import FormEducationItem from '../form-education-item';
import FormJobItem from '../form-job-item';
import FormOtherItem from '../form-others-item';
import './small.less';

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
      expanded: 0
    };
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
    this.move = this.move.bind(this);
  }

  add() {
    const newState = [...this.state.items];
    newState.push(this.props.structure);
    this.setState({items: newState, expanded: newState.length - 1});
    this.props.onChange([...newState]);
  }

  delete(idx) {
    const newState = [...this.state.items];
    newState.splice(idx, 1);
    this.setState({items: newState});
    this.props.onChange([...newState]);
  }

  move(idx, dir) {
    const newState = [...this.state.items];
    const item = newState.splice(idx, 1);
    newState.splice(dir === 'up' ? idx - 1: idx + 1, 0, item[0]);
    this.setState({items: newState});
    this.props.onChange([...newState]);
  }

  toggle(idx) {
    this.setState({expanded: this.state.expanded === idx ? -1 : idx});
  }

  handleFormChange(idx, formdata) {
    const newState = [...this.state.items];
    newState[idx] = formdata;
    this.setState({items: newState});
    this.props.onChange([...newState]);
  }

  render() {
    return (
      <div className="form-group form-section" >
        <ul>
        {this.state.items.map((item, i) =>
          <li key={i} className="list" >
            <div className="actions" >
              <ArrowUp
                color='#888'
                onClick={() => this.move(i, 'up')}
                style={{display: i === 0 ? 'none' : 'inline-block'}} />
              <ArrowDown
                color='#888'
                onClick={() => this.move(i, 'down')}
                style={{display: i === this.state.items.length - 1 ? 'none' : 'inline-block'}} />
              <Delete
                color='#888'
                onClick={() => this.delete(i)} />
            </div>
            <Card
              expanded={i === this.state.expanded}
              onExpandChange={() => this.toggle(i)} >
              <CardHeader
                title={item.heading || this.props.title}
                subtitle={'Click to expand'}
                actAsExpander={true} >
              </CardHeader>
              <CardText expandable={true}>
                {this.props.type === 'skills' && <FormSkillItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />}
                {this.props.type === 'job' && <FormJobItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />}
                {this.props.type === 'education' && <FormEducationItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />}
                {this.props.type === 'others' && <FormOtherItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />}
              </CardText>
            </Card>
          </li>
        )}
        </ul>
        <RaisedButton
          primary={true}
          label={this.props.buttonLabel}
          fullWidth={true}
          onClick={this.add} />
      </div>
    );
  }
}

FormGroup.propTypes = {
  data: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  buttonLabel: React.PropTypes.string.isRequired,
  structure: React.PropTypes.array.isRequired
};

export default FormGroup;
