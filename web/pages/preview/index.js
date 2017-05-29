import React from 'react';
import fetch from 'isomorphic-fetch';
import fileSaver from 'file-saver';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { base64ToBlob } from '../../utils/base64-to-blob.js';

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designId: 1,
      cvhtml: ''
    };
    let cvdata = typeof localStorage !== 'undefined' && localStorage.getItem('cvdata');
    this.cvdata = cvdata ? JSON.parse(cvdata) : (this.props.cvdata || {});
    this.download = this.download.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getDesign(1);
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

  getDesign(id) {
    fetch(`/design/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cvdata: this.cvdata})})
      .then((res) => {
        if (res.ok)
          return res.text();
        else throw Error('Error in fetching design');
      }).then((response) => {
        this.setState({cvhtml: response});
      }).catch(e => this.setState({error: e.message}));
  }

  handleChange(event, index, value) {
    this.setState({designId: value});
    this.getDesign(value);
  }

  render() {
    return (
      <div className="preview">
        <SelectField
          floatingLabelText="Select Design"
          value={this.state.designId}
          onChange={this.handleChange} >
          <MenuItem value={1} primaryText="Design 1" />
          <MenuItem value={2} primaryText="Design 2" />
        </SelectField>
        <RaisedButton label="Download" primary={true} onClick={this.download} />
        <div>{this.state.error}</div>
        <div dangerouslySetInnerHTML={{__html: this.state.cvhtml}} />
      </div>
    );
  }
}

Preview.propTypes = {
  cvdata: React.PropTypes.object
};

export default Preview;