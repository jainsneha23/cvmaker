import React from 'react';
import {EditorState} from 'draft-js';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import FormJobItem from '../form-job-item';
import './small.less';

class FormJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        company: {},
        jobtitle: {},
        location: {},
        startdate: {},
        enddate: {},
        currentjob: {},
        responsibilities: EditorState.createEmpty()
      }],
      expanded: -1
    };
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  add() {
    const newState = [...this.state.items];
    newState.push({
      company: {},
      jobtitle: {},
      location: {},
      startdate: {},
      enddate: {},
      currentjob: {},
      responsibilities: EditorState.createEmpty()
    });
    this.setState({items: newState});
  }

  delete(e, idx) {
    e.preventDefault();
    const newState = [...this.state.items];
    newState.splice(idx, 1);
    this.setState({items: newState});
  }

  toggle(idx) {
    this.setState({expanded: this.state.expanded === idx ? -1 : idx});
  }

  handleFormChange(idx, formdata) {
    const newState = [...this.state.items];
    newState[idx] = formdata;
    this.setState({items: newState});
  }

  render() {
    return (
      <div className="form-job form-section" >
      <ul>
      {this.state.items.map((item, i) =>
        <li key={i}>
          <Card expanded={i === this.state.expanded} onExpandChange={() => this.toggle(i)}>
            <CardHeader
              title={item.company.value || 'Company Name'}
              subtitle={'Click to expand'}
              actAsExpander={true} >
              <ContentDelete onClick={(e) => this.delete(e, i)} style={{float: 'right'}} />
            </CardHeader>
            <CardText expandable={true}>
              <FormJobItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />
            </CardText>
          </Card>
        </li>
      )}
      </ul>
      <RaisedButton
        primary={true}
        label="Add experience"
        fullWidth={true}
        onClick={this.add} />
      </div>
    );
  }
}

export default FormJob;
