import React from 'react';
import {EditorState} from 'draft-js';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import FormEducationItem from '../form-education-item';
import './small.less';

class FormEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        school: {},
        degree: {},
        field: {},
        grade: {},
        startdate: {},
        enddate: {},
        description: EditorState.createEmpty()
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
      school: {},
      degree: {},
      field: {},
      grade: {},
      startdate: {},
      enddate: {},
      description: EditorState.createEmpty()
    });
    this.setState({items: newState});
    this.props.onChange([...newState]);
  }

  delete(e, idx) {
    e.preventDefault();
    const newState = [...this.state.items];
    newState.splice(idx, 1);
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
      <div className="form-education form-section" >
      <ul>
      {this.state.items.map((item, i) =>
        <li key={i}>
          <Card expanded={i === this.state.expanded} onExpandChange={() => this.toggle(i)}>
            <CardHeader
              title={item.degree.value || 'Degree'}
              subtitle={'Click to expand'}
              actAsExpander={true} >
              <ContentDelete onClick={(e) => this.delete(e, i)} style={{float: 'right'}} />
            </CardHeader>
            <CardText expandable={true}>
              <FormEducationItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />
            </CardText>
          </Card>
        </li>
      )}
      </ul>
      <RaisedButton
        primary={true}
        label="Add Education"
        fullWidth={true}
        onClick={this.add} />
      </div>
    );
  }
}

FormEducation.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FormEducation;
