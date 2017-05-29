import React from 'react';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import { browserHistory } from 'react-router';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from 'material-ui/Toolbar';
import {Card, CardText} from 'material-ui/Card';

import * as Designs from '../../designs';
import Header from '../../components/header';
import { base64ToBlob } from '../../utils/base64-to-blob.js';

import './small.less';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designId: 1
    };
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || {});
    this.download = this.download.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  download() {
    fetch('/download',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cvdata: this.cvdata, designId: this.state.designId})})
      .then((res) => {
        if (res.ok)
          return res.json();
        else throw Error('Error in fetching resume');
      }).then((response) => {
        const blob = base64ToBlob(response.base64);
        fileSaver.saveAs(blob, 'resume.pdf');
      }).catch(e => this.setState({error: e.message}));
  }

  edit() {
    browserHistory.push('/create');
  }

  handleChange(event, index, value) {
    this.setState({designId: value});
  }

  render() {
    let Comp = Designs[`Design${this.state.designId}`];
    return (
      <div className="preview">
        <Header />
        <Toolbar className="toolbar">
          <ToolbarGroup className="toolbar-group">
            <SelectField
              floatingLabelText="Select Design"
              value={this.state.designId}
              onChange={this.handleChange} >
              <MenuItem value={1} primaryText="Design 1" />
              <MenuItem value={2} primaryText="Design 2" />
            </SelectField>
            <ToolbarSeparator style={{height: '56px'}}/>
            <RaisedButton label="Edit" onClick={this.edit} />
            <RaisedButton label="Download" primary={true} onClick={this.download} />
          </ToolbarGroup>
        </Toolbar>
        <div className="error">{this.state.error}</div>
        <Card className="card">
          <CardText>
            <Comp data={this.cvdata} />
          </CardText>
        </Card>
      </div>
    );
  }
}

Preview.propTypes = {
  cvdata: React.PropTypes.object
};

export default Preview;