import React from 'react';
import {EditorState} from 'draft-js';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import FormOthersItem from '../form-others-item';
import './small.less';

class FormOthers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        label: {},
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
      label: {},
      description: EditorState.createEmpty()
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
      <div className="form-others form-section" >
      <ul>
      {this.state.items.map((item, i) =>
        <li key={i}>
          <Card expanded={i === this.state.expanded} onExpandChange={() => this.toggle(i)}>
            <CardHeader
              title={item.label.value || 'Label'}
              subtitle={'Click to expand'}
              actAsExpander={true} >
              <ContentDelete onClick={(e) => this.delete(e, i)} style={{float: 'right'}} />
            </CardHeader>
            <CardText expandable={true}>
              <FormOthersItem onChange={(formdata) => this.handleFormChange(i, formdata)} item={item} />
            </CardText>
          </Card>
        </li>
      )}
      </ul>
      <RaisedButton
        primary={true}
        label="Add More"
        fullWidth={true}
        onClick={this.add} />
      </div>
    );
  }
}

export default FormOthers;
